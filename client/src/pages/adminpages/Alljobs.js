import React, { useEffect,useState } from 'react'
import AdminLayouts from '../../admincomponents/AdminLayouts'
import {useData} from '../../API/ApiContext'

const Alljobs = () => {
    const [jobs, setJobs] = useState([]);
    const [totalJobs, setTotalJobs] = useState(0);
    const [numOfPages, setNumOfPages] = useState(1);
    const [status, setStatus] = useState('all');
    const [jobType, setJobType] = useState('all');
    const [sort, setSort] = useState('latest');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const {getAllJobsAPI} = useData();

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };
    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };
    const handleJobTypeChange = (e) => {
        setJobType(e.target.value);
    };
    const handleSortChange = (e) => {
        setSort(e.target.value);
    };
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };
    //
    const handelSubmit = async(e)=>{
        const queryParams  = new URLSearchParams({
            status,
            jobType,
            sort,
            search,
            page,
            limit
        })
        const res = await getAllJobsAPI(queryParams)
        if(res.success){
            const {data} = res;
            console.log(data)
            setJobs(data.data.jobs)
            setTotalJobs(data.data.totalJobs)
            setNumOfPages(data.data.numOfPages)
        }else{
            console.error(res.message || res.error);
        }
    }
    useEffect(()=>{
        handelSubmit()
    },[status, jobType, sort, search, page, limit])
  return (
 <AdminLayouts>
 <section>
<div className="bg-white  rounded-lg shadow relative m-10">
<div className="flex items-start justify-between p-5 border-b rounded-t">
    <h3 className="text-xl font-semibold">
        Search Job
    </h3>
</div>
<div className="p-6 space-y-6">
    <form action="#" method='POST' onSubmit={handelSubmit}>
        <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
                <label for="Search" className="text-sm font-medium text-gray-900 block mb-2">Search</label>
                <input  type="text" onChange={handleSearchChange} value={search}  name="Search" id="Search" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="Search" required=""/>
            </div>
            <div className="col-span-6 sm:col-span-3">
            <label for="jobstatus" className="text-sm font-medium text-gray-900 block mb-2">Job Status</label>
  <select  name='jobstatus' onChange={handleStatusChange} value={status}  id="jobstatus" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5">
    <option value='all'>all</option>
    <option value='interview'>interview</option>
    <option value='declined'>declined</option>
    <option value='pending'>pending</option>
  </select>
            </div>
            <div className="col-span-6 sm:col-span-3">
            <label for="JobType" className="text-sm font-medium text-gray-900 block mb-2">Job Type</label>
  <select  name='jobtype' value={jobType}  id="JobType" onChange={handleJobTypeChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5">
    <option value='all'>all</option>
    <option value='full-time' >full-time</option>
    <option value='part-time'>part-time</option>
    <option value='internship'>internship</option>
  </select>
            </div>
            <div className="col-span-6 sm:col-span-3">
            <label for="Sort" className="text-sm font-medium text-gray-900 block mb-2">Sort</label>
  <select  name='Sort' value={sort} onChange={handleSortChange} id="Sort" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5">
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
  </select>
            </div>
        </div>
    </form>
</div>
<div className="p-6 border-t border-gray-200 rounded-b">
    <button onClick={()=> {
         setSearch('');
         setStatus('all');
         setJobType('all');
         setSort('latest');
         setPage(1);
    }}  className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Reset Search Value</button>
</div>
</div>
 </section>
 <section>

 </section>
 </AdminLayouts>
  )
}

export default Alljobs
