import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/layout';
import Loader from './../components/loader';
import { useNavigate } from 'react-router-dom';
import { DatePicker, message } from 'antd';
import moment from 'moment';
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Analytics from '../components/Analytics';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const { RangePicker } = DatePicker


function Home() {

    const navigate = useNavigate();

    //all states
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showTable, setShowTable] = useState(true);// if it is true , it means table will not be displayed
    const [frequency, setFrequency] = useState('all');
    const [selectedDate, setSelectedDate] = useState([])
    const [selectedType, setSelectedType] = useState('All');
    const [viewData, setViewData] = useState('table')
    const [showModal, setShowModal] = useState(false);
    const [transactionId, setTransactionId] = useState('')
    const [update, setUpdate] = useState(false);
    const [del, setDel] = useState(false);

    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState();
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [reference, setReference] = useState('');
    const [type, setType] = useState('Choose..');
    const [fetchData, setFetchData] = useState(true)


    //all functions

    const toggleModal = () => setShowModal(prevShow => !prevShow);

    function clearStates() {
        setAmount('');
        setType('Choose..')
        setCategory('Choose..')
        setDescription('');
        setDate('');
        setReference('');
        setUpdate(false);
        setDel(false);
    }

    function setStates(obj) {
        setAmount(obj.amount);
        setCategory(obj.category);
        setDate(moment(obj.date).format('YYYY-MM-DD'));
        setDescription(obj.description);
        setReference(obj.reference);
        setType(obj.type)
        setTransactionId(obj._id)
    }

    async function deleteTransaction() {
        try {
            const localData = JSON.parse(localStorage.getItem('alnasar'));

            const response = await fetch('/api/v1/deleteTransaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localData.token,
                },
                body: JSON.stringify({ transactionId }),
            });
            if (response.status === 200) {
                // const responseData = await response.json();
                message.success('Transaction is Deleted Successfully')
                setFetchData(!fetchData);
            } else {
                if (response.status === 410) {
                    message.error('Your session is Expired. Login again!')
                    localStorage.removeItem('alnasar');
                    navigate('/')
                }
                else {
                    message.error('Required operation cant be done.')
                }
            }
        } catch (error) {
            // console.error('An error occurred:', error);
        } finally {
            clearStates()
        }

    }


    async function UpdateTransaction() {
        if (category && description && date && reference && type && amount) {
            const parsedAmount = Number(amount);
            if (!isNaN(parsedAmount)) {
                try {
                    const localData = JSON.parse(localStorage.getItem('alnasar'));
                    const updatedTransactionData = {
                        transactionId,
                        amount,
                        type,
                        date,
                        category,
                        description,
                        reference,
                    };

                    const response = await fetch('/api/v1/updateTransaction', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: localData.token,
                        },
                        body: JSON.stringify(updatedTransactionData),
                    });
                    if (response.status === 200) {
                        // const responseData = await response.json();
                        // console.log("DATA Sending side of Home Page", responseData);
                        message.success('Transaction is Updated Successfully')
                        setFetchData(!fetchData);
                    } else {
                        if (response.status === 400) {
                            message.error('Not an authentic user!');
                            localStorage.removeItem('alnasar');
                            navigate('/');
                        }
                        if (response.status === 410) {
                            message.error('Your session is expired. Login again please..!')
                            localStorage.removeItem('alnasar');
                            navigate('/');
                        }
                        if (response.status === 500) {
                            message.error("Required Opereation can't be performed. Try Later!");
                        }
                    }
                } catch (error) {
                    // console.error('An error occurred:', error);
                } finally {
                    clearStates();
                    setLoading(false);
                }

            }
            else {
                message.warning('Amount is not a number')
            }
        }
        else {
            message.warning('Please Enter all the fields!')
        }
    }


    const sendData = async () => {
        setShowTable(true)
        try {
            const localData = JSON.parse(localStorage.getItem('alnasar'));
            const newTransactionData = {
                amount,
                type,
                date,
                category,
                description,
                reference,
            };

            const response = await fetch('/api/v1/storeNewExpense', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localData.token,
                },
                body: JSON.stringify(newTransactionData),
            });
            if (response.status === 200) {
                // const responseData = await response.json();
                // console.log("DATA Sending side of Home Page", responseData);
                clearStates();
                message.success('Transaction is stored Successfully')
                setFetchData(!fetchData);
            } else {
                if (response.status === 410) {
                    message.error('Your session is expired. Login again please..!')
                    localStorage.removeItem('alnasar');
                    navigate('/')
                }
                else if (response.status === 403) {
                    message.error("You're not an authorized user. Sorry!")
                    localStorage.removeItem('alnasar');
                    navigate('/')
                }
                else if (response.status === 500) {
                    message.error("Error in Server side!")
                }
            }
        } catch (error) {
            // console.error('An error occurred:', error);
        } finally {
            setLoading(false); // Set loading to false when done
        }

    }


    const handleSave = async () => {
        // console.log("All following DATA: ", category, description, date, reference, type, amount);
        if (category && description && date && reference && type && amount) {

            const parsedAmount = Number(amount);

            if (!isNaN(parsedAmount)) {
                // console.log('Saving data:', { category, description, date, reference, type, amount });
                sendData()
            }
            else {
                message.warning('Amount is not a number!');
            }
        }
        else {
            message.warning('Please Enter all the fields');
        }
    }



    useEffect(() => {
        const getData = async () => {
            try {
                setShowTable(true)
                const localData = JSON.parse(localStorage.getItem('alnasar'));
                const response = await fetch('/api/v1/getExpenses', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: localData.token,
                    },
                    body: JSON.stringify({ frequency, selectedDate, selectedType }),
                });
                if (response.status === 200) {
                    const responseData = await response.json();
                    setData(responseData.existingData);
                    // console.log("DATA From HOME PAGE ", responseData);
                }
                else if (response.status === 400) {
                    // const responseData = await response.json();
                    // console.log(responseData);
                    message.error("Required Operation can't be performed. Try Later!")
                }
                else {
                    // const responseData = await response.json();
                    // console.log(responseData);
                    if (response.status === 410) {
                        message.error('Your session is expired. Login again please..!')
                        localStorage.removeItem('alnasar');
                        navigate('/')
                    }
                }
            } catch (error) {
                // console.error('An error occurred:', error);
            } finally {
                setShowTable(false)
                setLoading(false); // Set loading to false when done
            }
        }

        function checkAuthentication() {
            const auth = localStorage.getItem('alnasar');
            if (!auth) {
                navigate('/')
            }
        }

        checkAuthentication();
        getData();
    }, [frequency, selectedDate, selectedType, fetchData,]);




    function Table({ data }) {

        if (!data || data.length === 0) {
            return <div className='container'><p>No Previous Record of selected Frequency is Available</p></div>;
        }

        var show = data.map((obj, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td className='tableDate'>{moment(obj.date).format('DD-MM-YYYY')}</td>
                    <td>{obj.amount}</td>
                    <td>{obj.type}</td>
                    <td>{obj.category}</td>
                    <td>{obj.reference}</td>
                    <td>{obj.description}</td>
                    <td className='tableIconsBox'><div><EditOutlined className='tableIcons' onClick={() => { toggleModal(); setStates(obj); setUpdate(true); }} /> <DeleteOutlined className='mx-1 tableIcons' onClick={() => { toggleModal(); setStates(obj); setDel(true); }} /></div></td>
                </tr>
            );
        });
        return (
            <div className='table-responsive container'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Date</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Type</th>
                            <th scope="col">Category</th>
                            <th scope="col">Referece</th>
                            <th scope="col">Description</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {show}
                    </tbody>
                </table>
            </div>
        );
    }


    return (
        <Layout>
            {loading ? (
                <Loader />
            ) : (
                <div className='contentBody'>
                    <div className='filters container'>
                        <div>
                            <h6>Select Frequency</h6>
                            <select className="form-select" value={frequency} onChange={(e) => setFrequency(e.target.value)} >
                                <option value='7' >Last 7 days</option>
                                <option value='30'>Last Month</option>
                                <option value='365'>Last Year</option>
                                <option value='all'>All Record</option>
                                <option value='custom'>Custom</option>
                            </select>
                            {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(value) => setSelectedDate(value)} />}
                        </div>
                        <div>
                            <h6>Select Type</h6>
                            <select className="form-select" aria-label="Default select example" value={selectedType} onChange={(e) => setSelectedType(e.target.value)} disabled={viewData === 'analytics'}>
                                <option value='All' >All</option>
                                <option value='Income'>Income</option>
                                <option value='Expense'>Expense</option>
                            </select>
                        </div>
                        <div className='mx-2'>
                            <UnorderedListOutlined className={viewData === 'table' ? 'active mx-2' : 'inactive mx-2'} onClick={() => setViewData('table')} />
                            <AreaChartOutlined className={viewData === 'analytics' ? 'active mx-2' : 'inactive mx-2'} onClick={() => { setViewData('analytics'); setSelectedType('All') }} />
                        </div>

                        <button className='filterBtn' onClick={toggleModal}>Add New</button>
                    </div>


                    <Modal show={showModal} onHide={() => { clearStates(); setDel(false); setUpdate(false); toggleModal(); }}>
                        <Modal.Header closeButton>
                            <Modal.Title>{update ? 'Update Transaction' : del ? 'Delete Transaction' : 'Add Transaction'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="form-floating mb-3">
                                    <input type="text" value={amount} className="form-control" id="amount" placeholder="Enter Amount" onChange={(e) => setAmount(e.target.value)} disabled={del} />
                                    <label htmlFor="amount">Amount</label>
                                </div>
                                <br></br>
                                <div className="form-floating">
                                    <select className="form-select" id="type" value={type} onChange={(e) => setType(e.target.value)} disabled={del} >
                                        <option disabled>Choose..</option>
                                        <option value='Income' >Income</option>
                                        <option value='Expense' >Expense</option>
                                    </select>
                                    <label htmlFor="type">Select Type</label>
                                </div>
                                <br></br>
                                <div className="form-floating">
                                    <select className="form-select" id="category" defaultValue="Choose.." value={category} onChange={(e) => setCategory(e.target.value)} disabled={del}>
                                        <option value='Choose..' disabled>Choose..</option>
                                        <option value="Income">Income</option>
                                        <option value="Tip">Tip</option>
                                        <option value="Project">Project</option>
                                        <option value="Found">Found</option>
                                        <option value="Food">Food</option>
                                        <option value="Medical">Medical</option>
                                        <option value="Tax">Tax</option>
                                        <option value="Fee">Fee</option>
                                        <option value="Game">Game</option>
                                        <option value="Party">Party</option>
                                        <option value="Rent">Rent</option>
                                        <option value="Gift">Gift</option>
                                        <option value="Lost">Lost</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <label htmlFor="category">Category</label>
                                </div>

                                <br></br>
                                <div className="form-floating">
                                    <input type="date" className="form-control" value={date} id="date" onChange={(e) => setDate(e.target.value)} disabled={del} />
                                    <label htmlFor="date">Date</label>
                                </div>
                                <br></br>
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="reference" value={reference} placeholder="Referece" onChange={(e) => setReference(e.target.value)} disabled={del} />
                                    <label htmlFor="reference">Reference</label>
                                </div>
                                <br></br>
                                <div className="form-floating mb-3">
                                    <input type="text" value={description} className="form-control" id="description" placeholder="Enter description" onChange={(e) => setDescription(e.target.value)} disabled={del} />
                                    <label htmlFor="description">Description</label>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>

                            <Button variant="primary" onClick={() => { toggleModal(); update ? UpdateTransaction() : del ? deleteTransaction() : handleSave() }}>
                                {update ? 'Update' : del ? 'Delete' : 'Save'}
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <br /><br></br>
                    {showTable ? <Loader /> : viewData === 'table' ? <Table data={data} /> : <Analytics data={data} />}

                </div>
            )}
        </Layout>
    );
}

export default Home;