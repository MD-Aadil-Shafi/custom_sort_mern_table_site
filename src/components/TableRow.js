import React,{useState,memo} from 'react'
import { API } from '../API';
import axios from 'axios'
import Swal from 'sweetalert2'

const TableRow = ({id,name,department,salary,getEmployees}) => {
    const [update, setUpdate] = useState(false);
    const [name1, setName] = useState(name)
    const [department1, setDepartment] = useState(department)
    const [salary1, setSalary] = useState(salary)
    const [loading, setLoading] = useState(false)

    const confirmDelete = async(id)=>{
        try{
          let res = await axios.delete(`${API}/employee/${id}`)
          if(res.data.success === true){
            Swal.fire('Employee deleted successfully').then(()=>{
              getEmployees()
            })
          }
        }catch(err){
          return Swal.fire({
            icon:'error',
              title:'Oops...',
              text: `${err.response.data.message}`
          })
        }
      }
  
      const deleteEmployee = async(id) =>{
        Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      confirmDelete(id)
    }
  })
      }

      const updateEmployee = async()=>{
        if(!name1 || !department1 || !salary1){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'All fields are required',
              })
        }
        let newData ={
            name:name1,
            department:department1,
            salary:salary1
        }
        setLoading(true)
        try{
            let res = await axios.patch(`${API}/employee/${id}`,newData)
                if(res.data.success === true){
                    Swal.fire('Employee updated successfully').then(()=>{
                        setUpdate(false);
                        getEmployees()
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
        <tr>
      <td>
        <input type='text' className='form-control' value={name1} onChange={e=>setName(e.target.value)} placeholder='name...' disabled={!update}/> 
      </td>
      <td>
      <textarea type='text' className='form-control' value={department1} onChange={e=>setDepartment(e.target.value)} placeholder='department...' disabled={!update}/> 
      </td>
      <td>
      <input type='number' className='form-control' value={salary1} onChange={e=>setSalary(e.target.value)} placeholder='salary...' disabled={!update}/> 
      </td>
      <td>
        <div className='d-flex'>
            {!update &&
        <button className='btn btn-sm btn-light text-warning shadow' onClick={()=>setUpdate(true)}><i className="fas fa-edit"></i></button>
            }
        {update &&
        <>
        <button className='btn btn-sm mx-1 bg-light text-secondary shadow' onClick={()=>setUpdate(false)}><i className="fas fa-times"></i></button>
        <button className='btn btn-sm mx-1 bg-light text-success shadow' onClick={updateEmployee} disabled={loading}><i className="fas fa-check"></i></button>
        </>
        }
        <button className='btn btn-sm bg-light text-danger shadow' onClick={()=>{deleteEmployee(id)}}><i className="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>
    )
}

export default memo(TableRow)
