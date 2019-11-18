import { useAuthentication } from '../../Authentication';
import { useState } from 'react';
import { config } from '../../../../aws-config';

/*
  States: 
  - null
  - error 
  - creating
  - created
*/

export const useSignaturesApi = () => {
  // we are calling useState to 1) return the state and 2) pass the setState function
  // to our createSignatureList function, so we can set the state from there
  const [state, setState] = useState(null);
  return [
    state,
    userId => createSignatureListOldUser(userId, setState),
    formData => createSignatureListNewUser(formData, setState),
    formData => createSignatureListAnonymous(formData, setState),
  ];
};

//Function to create (or get) a signature list for anonymous user
//formData does not have to hold email or userId
const createSignatureListAnonymous = async (formData, setState) => {
  try {
    setState('creating');
    const data = {};
    //handle campaign code
    data.campaignCode = formData.campaignCode;
    //call function to make api request, returns signature list if successful (null otherwise)
    const signatureList = await makeApiCall(data, setState);
    openPdf(signatureList);
    return signatureList;
  } catch (error) {
    console.log('Error while creating anonymous signature list', error);
    setState('error');
    return null;
  }
};

//Function to create (or get) a signature list for (possibly) new user
//formData needs to contain email, user is first registered through cognito
const createSignatureListNewUser = async (formData, setState) => {
  try {
    setState('creating');

    const [signUp] = useAuthentication();
    // check url params, if current user came from referral (e.g newsletter)
    const urlParams = new URLSearchParams(window.location.search);
    // the pk_source param was generated in matomo
    const referral = urlParams.get('pk_source');
    //TODO: handle referral and newsletter consent

    const data = {};
    //register user
    const userId = await signUp(formData.email);
    if (userId !== 'userExists' && userId !== 'error') {
      data.userId = userId;
      //new user: save referral and newsletterConsent
      const success = await updateUser(userId, referral);
      if (!success) {
        setState('error');
        return null;
      }
    } else if (userId === 'userExists') {
      //instead of the user id we pass the email to the api
      data.email = formData.email;
      //setState('userExists');
    } else {
      setState('error');
      return null;
    }
    //handle campaign code
    data.campaignCode = formData.campaignCode;
    //call function to make api request, returns signature list if successful (null otherwise)
    const signatureList = await makeApiCall(data, setState);
    openPdf(signatureList);
    return signatureList;
  } catch (error) {
    console.log('Error while creating signature list', error);
    setState('error');
    return null;
  }
};

//Function to create (or get) a signature list an already registered user
//userId is passed, user is not registeres through cognito
const createSignatureListOldUser = async (userId, setState) => {
  try {
    setState('creating');
    const data = { userId: userId };
    //handle campaign code
    data.campaignCode = formData.campaignCode;
    //call function to make api request, returns signature list if successful (null otherwise)
    const signatureList = await makeApiCall(data, setState);
    openPdf(signatureList);
    return signatureList;
  } catch (error) {
    console.log('Error while creating signature list', error);
    setState('error');
    return null;
  }
};

//Function which calls our api to create a (new) signature list
//returns the list {id, url} or null
const makeApiCall = async (data, setState) => {
  //make api call to create new singature list and get pdf
  const request = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(config.API.INVOKE_URL + '/signatures', request);
  const json = await response.json();
  //status might also be 200 in case there already was an existing pdf
  if (response.status === 201 || response.status === 200) {
    setState('created');
    return json.signatureList;
  }
  console.log('error', json.message);
  setState('error');
  return null;
};

const openPdf = signatureList => {
  if (signatureList !== null) {
    window.open(signatureList.url, '_blank');
  }
};

//Makes api call to update user in db, returns true if successful, false otherwise
const updateUser = async (userId, referral) => {
  //make api call to save newsletter consent and referral
  //we don't send newsletter consent, because we set it as true anyway
  const data = {};
  if (referral) {
    data.referral = referral;
  }
  const request = {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(
    `${config.API.INVOKE_URL}/users/${userId}`,
    request
  );
  if (response.status === 204) {
    return true;
  }
  return false;
};