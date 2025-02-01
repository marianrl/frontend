import React, { useEffect, useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { auditService } from '../../services/ams/audit';

interface Audit {
    id: number;
    fecha: string; // Fecha en formato ISO
    idTipoAuditoria: {
        id: number;
    };
}

interface DataItem {
    month: string;
    Internas: number;
    Afip: number;
}

const MonthsEnum = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
];

const getLast12Months = () => {
    const currentDate = new Date(); // Ultima fecha conocida
    const months = [];

    for (let i = 11; i >= 0; i--) {
        const date = new Date(currentDate);
        date.setMonth(date.getMonth() - i);
        months.push({
            key: `${date.getFullYear()}-${date.getMonth() + 1}`,
            month: MonthsEnum[date.getMonth()]
        });
    }

    return months;
};

const SimpleLineGraph: React.FC = () => {
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
        const last12Months = getLast12Months();
        const dataMap = new Map<string, { Internas: number; Afip: number }>();

        last12Months.forEach(({ key, month }) => {
            dataMap.set(key, { Internas: 0, Afip: 0 });
        });

        audits.forEach(audit => {
            const date = new Date(audit.fecha);
            const key = `${date.getFullYear()}-${date.getMonth() + 1}`;

            if (dataMap.has(key)) {
                const current = dataMap.get(key)!;
                if (audit.idTipoAuditoria.id === 9) {
                    current.Afip++;
                } else {
                    current.Internas++;
                }
                dataMap.set(key, current);
            }
        });

        const processedData = last12Months.map(({ key, month }) => ({
            month,
            Internas: dataMap.get(key)?.Internas || 0,
            Afip: dataMap.get(key)?.Afip || 0,
        }));

        setData(processedData);
        console.log("CONSOLE LOG  " + data);
    };

    return (
        <ResponsiveContainer width="100%" height="100%" minHeight="282px" minWidth="825px">
            <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Afip" stroke="#8884d8" />
                <Line type="monotone" dataKey="Internas" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default SimpleLineGraph;
