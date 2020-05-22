import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonTextarea, IonButton, IonSelect, IonSelectOption, IonLabel, IonItem, IonList } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import { ObjMobileContact, ObjMobileContactPost , GetPlayerObj, ObjAttendee} from '../misc/models';
import { getMessage, postTextMessage, getPlayersFromDB } from '../misc/rest_soccer';

const Message: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  const [firstTimeLoad, setFirstTimeLoad] = useState(true);
  const [mobileContact, setMobileContact] = useState(ObjMobileContact);
  const [getPlayersObj, setGetPlayersObj] = useState(GetPlayerObj)
  const [message, setMessage] = useState("");
  const [selectedDay, setSelectedDay] = useState("Sun");
  const [playersForSelectedDay, setPlayersForSelectedDay] = useState(ObjAttendee.PlayersForDay);

  useEffect(() =>{
    getMobileContactFromDB();
    getPlayers();
  },[firstTimeLoad])

  useEffect(() => {
      if(mobileContact.Message)
      {
        setMessage(mobileContact.Message)
      }
      
  },[mobileContact])

  useEffect(() => {
   
    if(selectedDay == "Sun")
    {
      setPlayersForSelectedDay(getPlayersObj.SunRSVP.PlayersForDay);
    }
    if(selectedDay == "Mon")
    {
      setPlayersForSelectedDay(getPlayersObj.MonRSVP.PlayersForDay);
    }
    if(selectedDay == "Tue")
    {
      setPlayersForSelectedDay(getPlayersObj.TueRSVP.PlayersForDay);
    }
    if(selectedDay == "Wed")
    {
      setPlayersForSelectedDay(getPlayersObj.WedRSVP.PlayersForDay);
    }
    if(selectedDay == "Thu")
    {
      setPlayersForSelectedDay(getPlayersObj.ThuRSVP.PlayersForDay);
    }
    if(selectedDay == "Fri")
    {
      setPlayersForSelectedDay(getPlayersObj.FriRSVP.PlayersForDay);
    }
  }, [getPlayersObj, selectedDay])

  function getMobileContactFromDB() {
    getMessage().then(response => {
      setMobileContact(response.data);
    }, error => {
      console.log("getMobileContactFromDB error", error)
    })
  }

  function getPlayers() {
    getPlayersFromDB().then(response => {
      setGetPlayersObj(response.data);
    }, error => {
      console.log("getPlayers error", error)
    })
  }

  function postMessage()
  {
    ObjMobileContactPost.Message = message;
    ObjMobileContactPost.Operation = "Add Message";
    postTextMessage(ObjMobileContactPost);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Message</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Messaging Center Soccer</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div>
           <IonTextarea rows={5}
                        cols={15}
                        value={message}
                        style={{border: "1px solid"}}
                        onIonChange={(e) => {
                          setMessage(e.detail.value!)
                        }}
           ></IonTextarea>
           <IonButtons>
               <button onClick={postMessage}>
                 Save Message
               </button>
            </IonButtons>

            <br/>
            <IonItem>
              <IonLabel>Select Day</IonLabel>          
              <IonSelect
                 value={selectedDay}
                 onIonChange={e => setSelectedDay(e.detail.value) }
              >
                  <IonSelectOption>Sun</IonSelectOption>
                  <IonSelectOption>Mon</IonSelectOption>
                  <IonSelectOption>Tue</IonSelectOption>
                  <IonSelectOption>Wed</IonSelectOption>
                  <IonSelectOption>Thu</IonSelectOption>
                  <IonSelectOption>Fri</IonSelectOption>
              </IonSelect>
            </IonItem>

            <IonList>
               {playersForSelectedDay.map((player, i) => {
                var p:any = player;
                return  <IonLabel key={i}>{p}</IonLabel>
               })}
            </IonList>
            
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Message;
