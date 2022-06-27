import React, { useEffect, useMemo, useState } from 'react'
import Modals from '../components/Modal'
import sampleData from '../sample.json'
import { API } from '../API'
import axios from 'axios'
import Swal from 'sweetalert2'
import TableRow from '../components/TableRow'
import './table.css'

const Table = () => {
    const [data, setData] = useState([])
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState()
    const [order, setOrder] = useState("ASC")
    

    const sorting = (info)=>{
      if(order === "ASC"){
        if(info === 'salary'){
          const sorted = [...data].sort((a,b)=>
            a[info] > b[info] ? 1 : -1
            );
            setData([...sorted])
            setOrder("DSC")
        }else{
          const sorted = [...data].sort((a,b)=>
            a[info].toLowerCase() > b[info].toLowerCase() ? 1 : -1
            );
            setData([...sorted])
            setOrder("DSC")
          }   
      }
      if(order === "DSC"){
      if(info === 'salary'){
        const sorted = [...data].sort((a,b)=>
          a[info] < b[info] ? 1 : -1
          );
          setData([...sorted])
          setOrder("ASC")
      }else{
        const sorted = [...data].sort((a,b)=>
          a[info].toLowerCase() < b[info].toLowerCase() ? 1 : -1
          );
          setData([...sorted])
          setOrder("ASC")
        }  
      }
    }


    const getEmployees = async()=>{
      try{
        setLoading(true)
        let res = await axios.get(`${API}/employee`);
        if(res.data.success === true){
          setData(res.data.data)
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

    useMemo(()=>{
      getEmployees()
    },[])

    return (
        <>
     {show &&
        <Modals setShow={setShow} getData={getEmployees}/>
     }
        <div className='container table-container'>
            <div className='d-flex justify-content-between align-items-center mt-5'>
            <h1 className='fw-light'>Employee Details</h1>
            <div>
            <button className='btn btn-sm btn-primary' onClick={()=>setShow(true)}>Add Employee</button>
            </div>
            </div>
           
            <hr></hr>

            <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Name <button className='btn badge btn-info' onClick={()=>sorting("name")}><i className="fas fa-arrow-up"></i> <i class="fas fa-arrow-down"></i></button></th>
      <th scope="col">Department <button className='btn badge btn-info' onClick={()=>sorting("department")}><i className="fas fa-arrow-up"></i> <i class="fas fa-arrow-down"></i></button></th>
      <th scope="col">Salary <button className='btn badge btn-info' onClick={()=>sorting("salary")}><i className="fas fa-arrow-up"></i> <i class="fas fa-arrow-down"></i></button></th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>

{[...data]?.map((item,i)=>(
  <TableRow key={item._id} id={item._id} name={item.name} department={item.department} salary={item.salary} getEmployees={getEmployees}/>
)

)}
  </tbody>
</table>

{loading && 
<h1 className='text-center py-5 my-5'>
<div class="spinner-border" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
</h1>
}

        </div>
        <div className='container-fluid text-center bg-dark mb-0 notation'><p className='fw-light text-light py-3'>Assignment By - Aadil</p></div>
        </>
    )
}

export default Table
