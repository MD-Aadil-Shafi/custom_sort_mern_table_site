import React, { useState } from 'react'
import './modal.css'
import Swal from 'sweetalert2'
import { API } from '../API'
import axios from 'axios'

const Modals = ({setShow,getData}) => {
    const [name, setName] = useState('')
    const [department, setDepartment] = useState('')
    const [salary, setSalary] = useState('')
    const [loading, setLoading] = useState(false)

const handleAdd = async()=>{
    if(!name || !department || !salary){
        return Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'All fields are required',
          })
    }
    setLoading(true)
    try{
        let res = await axios.post(`${API}/employee`,{name,department,salary});
        if(res.data.success === true){
            Swal.fire('Employee Added successfully').then(()=>{
                setShow(false);
                getData();
            })
        }
    }catch(err){
        setLoading(false)
        return Swal.fire({
            icon:'error',
            title:'Oops...',
            text: `${err.response.data.message}`
        })
    }
    setLoading(false)
}

    return (
        <div className='container-fluid modals'>
            <div className='col-md-6 inner-div p-5 bg-light card'>
                <div className='d-flex justify-content-end'>
                    <button className='btn btn-dark' onClick={()=>setShow(false)}><i className="fas fa-times"></i></button>
                </div>
                <h4 className='fw-light mb-4'>Enter employee details</h4>

                <input className='form-control mb-3' type="text" onChange={e=>setName(e.target.value)} placeholder="name..."/>
                <textarea className='form-control mb-3' type="text" onChange={e=>setDepartment(e.target.value)} placeholder="department..."/>
                <input className='form-control mb-3' type="number" onChange={e=>setSalary(e.target.value)} placeholder="salary..."/>
                
                <button className='btn btn-success w-50 mt-4' onClick={handleAdd} disabled={loading}>
                    {loading ?
                <>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  <span class="visually-hidden">Loading...</span>
                </>    
                :
                'Save'
                }
                </button>

            </div>
            
        </div>
    )
}

export default Modals
