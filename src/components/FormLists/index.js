import React,{useEffect, useState} from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link}  from "react-router-dom"
import "./index.css"

const FormList = () => {
    const [formData, setFormData] = useState([]);
    useEffect(()=>{
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };
      axios.get(`${process.env.REACT_APP_URL}questions/getAll`,{
        headers: headers,
      }).then((response)=>{
        console.log(response.data)
        setFormData(response.data.reverse());
      }).catch((err)=>{
        toast.dark(err);
      })
    },[])
    return (
        <> 
        <ToastContainer />
        <h2 className="mt-3 text-center">Form Lists</h2>
        <div className="m-auto" style={{width: "70%"}}>
            <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Form Name</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Responses Count</th>
                  <th scope="col">URL</th>
                </tr>
              </thead>
              <tbody>
                  {formData.map((ele, index) => {
                      return <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{ele.formname}</td>
                        <td>{ele.createdAt.slice(0, 10)}</td>
                        <td>{ele.responses.length || 0}</td>
                        <td>
                          <Link className="color" to={"/formlist/"+ele._id}>View Form</Link>
                        </td>
                      </tr>
                    })}
              </tbody>
            </table>
        </div>            
      </>
    );
}

export default FormList;