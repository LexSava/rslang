async function getUserDatas<T>(url: string, bearerToken: string):Promise<T> {
   const init: RequestInit = {
     method: 'GET',
     headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`
    }
    };
    const res = await fetch(url, init);

    if (!res.ok) {
      throw new Error(`${url}, received ${res.status}`);
    }
    const body = await res.json();
    return body
  }

export default getUserDatas;