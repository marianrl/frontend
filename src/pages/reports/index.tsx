import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Header from "../../components/header";
import "./style.css"

const Reports: React.FC = () => {
    const navigate = useNavigate();
    const name = localStorage.getItem('name');
    const lastName = localStorage.getItem('lastName');

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            // Redirigir solo si el usuario no está autenticado
            navigate("/login");
        }
    }, [ navigate]);

    return (
        <div className="home">
            <header>
                <Navbar/>
                <div>
                    <Header name= {name && lastName ? name + ' ' + lastName : 'Guest'}/>
                </div>
            </header>
            <div className="table-responsive">
                <div className="table-wrapper">
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>Location</th>
                            <th>Order Date</th>
                            <th>Status</th>
                            <th>Net Amount</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>London</td>
                            <td>Jun 15, 2017</td>
                            <td><span className="status text-success">&bull;</span> Delivered</td>
                            <td>$254</td>
                            <td><a href="#" className="view" title="View Details" data-toggle="tooltip"><i
                                className="material-icons">&#xE5C8;</i></a></td>
                        </tr>
                        <tr>
                            <td>Madrid</td>
                            <td>Jun 21, 2017</td>
                            <td><span className="status text-info">&bull;</span> Shipped</td>
                            <td>$1,260</td>
                            <td><a href="#" className="view" title="View Details" data-toggle="tooltip"><i
                                className="material-icons">&#xE5C8;</i></a></td>
                        </tr>
                        <tr>
                            <td>Berlin</td>
                            <td>Jul 04, 2017</td>
                            <td><span className="status text-danger">&bull;</span> Cancelled</td>
                            <td>$350</td>
                            <td><a href="#" className="view" title="View Details" data-toggle="tooltip"><i
                                className="material-icons">&#xE5C8;</i></a></td>
                        </tr>
                        <tr>
                            <td>New York</td>
                            <td>Jul 16, 2017</td>
                            <td><span className="status text-warning">&bull;</span> Pending</td>
                            <td>$1,572</td>
                            <td><a href="#" className="view" title="View Details" data-toggle="tooltip"><i
                                className="material-icons">&#xE5C8;</i></a></td>
                        </tr>
                        <tr>
                            <td>Paris</td>
                            <td>Aug 04, 2017</td>
                            <td><span className="status text-success">&bull;</span> Delivered</td>
                            <td>$580</td>
                            <td><a href="#" className="view" title="View Details" data-toggle="tooltip"><i
                                className="material-icons">&#xE5C8;</i></a></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}


export default Reports;

