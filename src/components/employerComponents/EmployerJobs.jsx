import { useEffect, useState } from "react"
import EmployerNavBar from "./EmployerNavBar"
import cta from "../../assets/cta.jpg"
import { Link } from "react-router-dom"


export default function EmployerJobs(){
    const [jobs,setJobs] = useState([])
    useEffect(()=>{
        fetch("http://127.0.0.1:3000/jobs")
        .then(resp=>resp.json())
        .then(data=>setJobs(data.filter(job=>job.employer.id==1)));
    },[])
    return(
        <div id="employerJobsPage">
            {console.log(jobs)}
            <EmployerNavBar />
            <section id="cardContainer">
                {/* {jobs?  <JobList jobs={jobs}/>:<NoJobs />} */}
                {/* <JobCard /> */}
                <JobList jobs={jobs} />
            </section>
        </div>
    )
}

function JobList({jobs}){
    return(
        <>
            {jobs?.map((job,index)=>{
               return <JobCard key={index} job={job} />
            })}
        </>
    )
}

function JobCard({job}){
    return(
    <>
    <div className="card">
            <section className="jobDetails">
            <h1>{job.job_title}</h1>
            <h2>{job.category}</h2>
                <p>Status: Complete/matched/active</p>
                <p>Main Skill: Ruby on Rails</p>
                <p>Experience Level: Expert/Intermediate/Junior</p>
                <p>{job.employer.username}</p>
                {/* <p>Other Skills Needed:</p> */}
                
                <p>{job.job_description}</p>
                <p>Number of applicants: {job.number_of_applicants}</p>
                {/* <ul className="otherSkills">
                    <li>JavaScript</li>
                    <li>Sinatra</li>
                    <li>React JS</li>
                </ul> */}
                {/* <button id="DeleteJob">Delete</button> */}
                </section>
    </div>
    </>
    )
}

function NoJobs(){
    return (
        <div className="container" id="landingPageContainer">
            <main>
                <div id="employerContainer" className="dashboard">
                <figure>
                    <img className="heroImage" src={cta} alt="" />
                </figure>
                <section className="employerIntro">
                    <h1>
                        You currently have no active jobs.
                    </h1>
                    <h2>
                        You can now hire the best talent in any given field.
                        We have the best there is out there, right here.
                    </h2>
                    <Link to="/jobform">
                        Get Started
                    </Link>
                </section>
            </div>
            </main>  
        </div>
    )
}