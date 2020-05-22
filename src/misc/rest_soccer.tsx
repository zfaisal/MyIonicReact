import axios from 'axios';

var url = "http://localhost:50799" //"http://208.78.220.64:85"

export function getPlayersFromDB()
{
    return axios.get(url + "/api/players")
}

export function getMessage() 
{
    return axios.get(url + "/api/mobilecontacts");
}

export function postTextMessage(main: any)
{
    return axios.post(url + "/api/mobilecontacts", main)
}