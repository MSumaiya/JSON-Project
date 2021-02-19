import React,{useState, useEffect} from 'react';

import Myjson from './myjson/MyJson.json';

export default function JsonInfo(props) { 


    const [isShown, setIsShown] = useState([]);
    const [input1, setInput1]=useState('');
    const [input2, setInput2]=useState('');
    const [input3, setInput3]=useState('');
    const [result, setResult]=useState(0);
    const [value, setValue] = useState({
        Breath: [],
        Skin: [],
        "Flesh and Weight": [],
    });
    //const [scoring, setScoring]=useState(0);

        /* function addScore(scr){
            setScoring(scoring+scr);
            console.log("scoring: ", scoring);
        }
 */

    
    
        function handleSelect(e) {
        //let id=e.target.firstChild.dataset.id;
        let name = e.target.name;
        if(e.target.value==='0'){
            return 
        }
        let newValue = value[name];

        if(newValue.includes(e.target.value)){
            return 
        }
        newValue.push(e.target.value);
        setValue({ ...value, [name]: newValue});

    }
 function deleteOption(name, option){
    let newValue = value[name];
    let index = newValue.indexOf(option);
    newValue.splice(index, 1);
    setValue({ ...value, [name]: newValue});
 }

    function syncInputWithValue1(e){
        setInput1(e.target.value);
    }
    function syncInputWithValue2(e){
        setInput2(e.target.value);
    }
    function syncInputWithValue3(e){
        setInput3(e.target.value);
    }

    function calculation(){
        let Pi=3.14
        setResult(4/3*parseInt(input1)/2*parseInt(input2)/2*parseInt(input3)/2*Pi);
        setInput1('');
        setInput2('');
        setInput3('');
    }
    
    function clickEvent(ani) {
      /* setIsShown(!isShown); */
        setIsShown(
        isShown.map((animalShown) => {
        if (animalShown.id === ani) {
            animalShown.showing = !animalShown.showing;
        }
    return animalShown;
        })
    );
    }


    useEffect(() => {
    let startValues = Myjson.Animals.map((animal) => {
        return { id: animal.Id, showing: false };
    });
    setIsShown(startValues);
    }, []);




    //console.log("MyJson ID: ", Myjson.Id, 'cageId:',props.data);
    //console.log("Cage Id: ", props.data);
    if(Myjson.Id === props.data){
        const testHtml = Myjson.Animals.map((animal) => {
            //console.log(isShown);
            if (isShown.length > 0 && isShown.filter((a) => a.id === animal.Id)[0].showing) {
                console.log("Rendering:" , animal.Id);
                return (
                <div key={animal.Id} className="posts">
                    <table  className="posts">
                        <tr key={animal.Id}>
                        <th>Animal-Id</th>
                        <th>Animal-Identification</th>
                        <th>Animal-StudyGroupName</th>
                        <th>Details</th>  
                        </tr>
                        <tr>
                        <td>{animal.Id}</td>
                        <td>{animal.Identification} </td>
                        <td>{animal.StudyGroupName} </td>
                        <td><button type="button" onClick={() => clickEvent(animal.Id)}>
                            Show Details
                            </button></td>
                        </tr>
                    </table>
                    <ul>

                    {animal.Activities.map((activity) => {
                        let activityType=<div></div>;
                            if (activity.ActivityType === 4)
                            {
                            activityType=(
                    
                                    <div key={activity.id}>
                                    <h2>{activity.ActivityName}</h2>
                                    <button>done</button>
                                    <p><i>{activity.LatestDate}</i></p>
                                    </div>
                                                            );
                            }
                            if(activity.ActivityType===9){
                                activityType=(
                                    <div key={activity.id}>
                                    <h2>{activity.ActivityName}</h2>
                                    <input></input>
                                    <button>Save</button>
                                    <p><i>{activity.LatestDate}</i></p> 

                                    </div>
                                )
                            }
                            if(activity.ActivityType===6){
                                const cal= parseFloat(activity.LatestResult)*10/1000;
                                activityType=(
                                    <div key={activity.id}>
                                        <h2>{activity.ActivityName}</h2>
                                        <p>Substance:{activity.Substance}</p>
                                        <p>Conc:{activity.Concentration}</p>
                                        <p>FormulaConc:{activity.FormulationConcentration}</p>
                                        <p>Dose:{activity.Dose}</p>
                                        <p>{cal}</p>
                                        <p><i>{activity.LatestDate}</i></p>
                                        </div>
                                    )
                                }
                                if(activity.ActivityType===5){
                                    activityType=(
                                        <div key={activity.id}>
                                        <h2>{activity.ActivityName}</h2>
                                        <p><i>Select</i></p>
                                        <p><i>{activity.LatestDate}</i></p>
                                        </div>
                                    )
                                }
                                if(activity.ActivityType===3){
                                    let numericValues1=(activity.NumericValues).split(',',1)
                                    let numericValues2=(activity.NumericValues).slice(6,12)
                                    let numericValues3=(activity.NumericValues).slice(13,19)
                                
                                
                                    //let result = 4/3*(numericValues1/2)*(numericValues2/2)*(numericValues3/2)*[Pi]
                                    activityType=(
                                        <div >
                                        <h2>{activity.ActivityName}</h2>
                                        <form>
                                        <label>{numericValues1}</label> 
                                        <input onChange={syncInputWithValue1} value={input1}></input>
                                        <label>{numericValues2}</label> 
                                        <input onChange={syncInputWithValue2} value={input2}></input>
                                        <label>{numericValues3}</label>
                                        <input  onChange={syncInputWithValue3} value={input3}></input>
                                        <button type="button" onClick={calculation}>calculate</button>
                                        <p>Result:{result}</p>
                                        </form>
                                        <button>Save</button><i>{activity.LatestDate}</i>
                                        </div>
                                    )
                                }
                                return activityType;
                            })
                        }
                    </ul>
                </div>
                );
            } else {
                return (
                <table key={animal.Id} className="posts">
                    <tr>
                    <th>Animal-Id</th>
                    <th>Animal-Identification</th>
                    <th>Animal-StudyGroupName</th>
                    <th>Details</th>
                    </tr>
                    <tr>
                    <td>{animal.Id}</td>
                    <td>{animal.Identification} </td>
                    <td>{animal.StudyGroupName} </td>
                    <td><button type="button" onClick={() => clickEvent(animal.Id)}>
                    Show Details
                    </button></td>
                    </tr>
                </table>
                );
            }
            });
            const obsHTML=Myjson.ObservationGroups.map((a)=>{
            
                return(
                    <div key={a.ObservationGroupId}> 
                        {a.ObservationGroupName}:
                    <form>

                    <select onChange={handleSelect} name={a.ObservationGroupName}> 
                        <option value='0'></option>
                        {a.Observations.map((observation)=>{
                            
                            //console.log('totalScore', totalScore);
                            return (                                 
                                <option key={observation.Id} /* onChange={() => addScore(observation.Scoring)} */>
                                    Observation Name: {observation.Name} ObservationId: {observation.Id} Scoring: {observation.Scoring} 

                                </option>
                            )
                        })}
                    </select>
                    </form>
                    
                    {/* {a.ObservationGroupId === value.id ? <ul><li>{value[a.ObservationGroupName.replace(' ','')]}</li></ul> : <React.Fragment/>}
                    {a.ObservationGroupId === value.id ? <h4> Total Scoring:</h4> : <React.Fragment/>}    */}
                        {/* <ul>
                            {value[a.ObservationGroupName] ? value[a.ObservationGroupName].map((x) => {
                            return <li>{x}</li>;
                            }) : <></>}
                        </ul> */}
                        
                    </div>
                    
                    )
            }) 
            let keys = Object.keys(value);
            let scoring = 0;
            let obId1=[];
            let ulList = (<ul>
                {
                    keys.map((key) => {
                        return value[key].map((lis,index) => {
                            let x= lis.split('Scoring:')
                            let y = parseFloat(x[1])
                            scoring = scoring + y;

                            let obId= lis.split(' ')
                            obId1.push(obId[4]+',')
                            return (
                            <div>
                            <li key={index}>{lis}</li>
                                    <button onClick={()=>{deleteOption(key,lis)}}>delete</button>
                        </div>
                        )
                        })
                    })
                }
                </ul>);
function sendToAPI(){
    alert(scoring +' ' + obId1);
}
                
            /* let sum=0;
            let addScoring= Myjson.ObservationGroups.Observations.map((observation)=>{
                return sum+=parseFloat(observation.Scoring)
            }) */
            
            return (
                <React.Fragment>
            
                {testHtml}
                {obsHTML}
                {ulList}
                {obId1}
                {/* {addScoring} */}
                <p>Total Scoring: {scoring}</p>
                <button onClick={sendToAPI}>send</button>
            </React.Fragment>
            );           
    }

    else{
        return null;
    }




}