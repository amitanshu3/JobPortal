import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';



const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    
    useEffect(() => {
        console.log(allJobs)
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                const query = searchedQuery.toLowerCase();
                const jobSalary = parseFloat(job.salary);
    
                if (query.includes('k') || query.includes('lakh')) {
                    if (query === '0-40k') {
                        return jobSalary >= 0 && jobSalary <= 0.4;
                    }
                    if (query === '40k-5lakh') {
                        return jobSalary >= 0.4 && jobSalary <= 5;
                    }
                    if (query === '5lakh to 10lakh') {
                        return jobSalary >=5 && jobSalary <= 10;
                    }
                    if(query==='10lakh to 20lakh'){
                        return jobSalary >=10 && jobSalary <=20;
                    }
                } else {
                    
                    return (
                        job.title.toLowerCase().includes(query) ||
                        job.description.toLowerCase().includes(query) ||
                        job.location.toLowerCase().includes(query)
                    );
                }
            });
    
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);
    

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>


        </div>
    )
}

export default Jobs
