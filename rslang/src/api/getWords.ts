async function getWords<T>(url: string):Promise<T> {
   const init: RequestInit = {
     method: 'GET',
     headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
    };
    const res = await fetch(url, init);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    const body = await res.json();
    return body
  }

export default getWords;