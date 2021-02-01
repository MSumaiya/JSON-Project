import React,{useState, useEffect} from 'react';

import Myjson from './myjson/MyJson.json';

export default function JsonInfo(props) { 


    const [isShown, setIsShown] = useState([]);
    
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
                                    activityType=(
                                        <div >
                                        <h2>{activity.ActivityName}</h2>
                                        <p>{numericValues1}</p> <input></input>
                                        <p>{numericValues2}</p> <input></input>
                                        <p>{numericValues3}</p><input></input>
                                        <p>Result:</p>
                                        
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
    
        
            return (
            <React.Fragment>
            
                {testHtml}
            </React.Fragment>
            );
    }

    else{
        return null;
    }




}