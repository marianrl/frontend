import React, { useEffect, useState } from 'react';
import { 
    BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { auditService } from '../../../services/ams/audit';
import { Audit } from '../../../types/audit';

interface DataItem {
    year: string;
    Internas: number;
    AFIP: number;
}

interface SimpleBarGraphProps {
    width?: string | number;
    height?: string | number;
}

const SimpleBarGraph: React.FC<SimpleBarGraphProps> = ({ width = "100%", height = "100%" }) => {
    const [data, setData] = useState<DataItem[]>([]);

    useEffect(() => {
        const fetchAudits = async () => {
            try {
                const response = await auditService.fetchAllAudit('audit');
                processData(response.data);
            } catch (error) {
                console.error('Error al obtener las Auditorias', error);
            }
        };

        fetchAudits();
    }, []);

    const processData = (audits: Audit[]) => {
        const dataMap = new Map<string, { Internas: number; AFIP: number }>();

        audits.forEach(audit => {
            const year = new Date(audit.auditDate).getFullYear().toString();

            if (!dataMap.has(year)) {
                dataMap.set(year, { Internas: 0, AFIP: 0 });
            }

            const current = dataMap.get(year)!;

            if (audit.idTipoAuditoria.id === 9) {
                current.AFIP++;
            } else {
                current.Internas++;
            }

            dataMap.set(year, current);
        });

        const processedData: DataItem[] = Array.from(dataMap.entries()).map(([year, counts]) => ({
            year,
            Internas: counts.Internas,
            AFIP: counts.AFIP,
        })).sort((a, b) => parseInt(a.year) - parseInt(b.year)); // Ordenar por año

        setData(processedData);
    };

    return (
        <ResponsiveContainer width={width} height={height}>
            <BarChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="AFIP" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                <Bar dataKey="Internas" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default SimpleBarGraph;
