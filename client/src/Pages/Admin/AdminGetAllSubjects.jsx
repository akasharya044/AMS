import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { adminDeleteSubject, adminGetAllSubject } from '../../redux/action/adminAction'
import AdminHomeHelper from '../../Components/AdminHomeHelper'
import classnames from 'classnames'
import { Button } from '@mui/material'

const AdminGetAllSubjects = () => {
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const [department, setDepartment] = useState('')
    const [year, setYear] = useState('')
    const [error, setError] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const history = useNavigate()


    const formHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        dispatch(adminGetAllSubject({ department, year }))

    }

    const handleDelete = (code) => {
        dispatch(adminDeleteSubject({ code }))
    }

    useEffect(() => {
        if (store.admin.allSubject.length !== 0) {
                setIsLoading(false)
        }

    }, [store.admin.allSubject.length, isLoading])
    return (
        <div>
            <div>
                {store.admin.isAuthenticated ? <>
                    <AdminHomeHelper />
                    <div className="container Department_List">
                        <div className="row mt-5">
                            <div className="col-md-4">
                                <form noValidate onSubmit={formHandler}>
                                    <div className="form-group">
                                        <label htmlFor="departmentId">Department</label>
                                        <select onChange={(e) => setDepartment(e.target.value)} className={classnames("form-control",
                                            {
                                                'is-invalid': error.department
                                            })} id="departmentId">
                                            <option>Select</option>
                                            <option value="BCA">BCA</option>
                                            <option value="BBA-IB">BBA-IB</option>
                                            <option value="BCP">BCP</option>
                                            <option value="BBA">BBA</option>
                                            <option value="BA(JMC)">BA(JMC)</option>
                                        </select>
                                        {error.department && (<div className="invalid-feedback">{error.department}</div>)}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="yearId">Year</label>
                                        <select onChange={(e) => setYear(e.target.value)} className={classnames("form-control",
                                            {
                                                'is-invalid': error.year
                                            })} id="yearId">
                                            <option>Select</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                        {error.year && (<div className="invalid-feedback">{error.year}</div>)}
                                    </div>
                                    <div class="row justify-content-center">
                                        <div class="col-md-1">
                                            {
                                                isLoading && <div class="spinner" role="status">
                                                    <span class="sr-only">Loading...</span>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    {!isLoading && <button type="submit" className="btn btn-info btn-block  ">Search</button>}
                                   
                                </form>
                                <br/>


                            </div>
                            <div className="col-md-8 col-lg-9">
                                <div className="table-responsive">
                                    <table className="table table-striped">

                                        {store.admin.allSubject.length !== 0 && <table className="table table-striped table-bordered  table-hover">
                                    <thead className='table-dark'>
                                        <tr>
                                            <th scope="col">S.No</th>
                                            <th scope="col">Subject Code</th>
                                            <th scope="col">Subject Name</th>
                                            <th scope="col">Total Lectures</th>
                                            <th scope="col">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            store.admin.allSubject.map((res, index) =>
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{res.subjectCode}</td>
                                                    <td>{res.subjectName}</td>
                                                    <td>{res.totalLectures}</td>
                                                    <td><Button onClick={() => handleDelete(res.subjectCode)}><i className="bi bi-trash3 text-danger"></i></Button></td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>}
                                </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </> : (history('/'))}
            </div>
            
        </div>
    )
}

export default AdminGetAllSubjects
