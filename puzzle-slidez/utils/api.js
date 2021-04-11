
import { invoke } from './controlFlow';

function getRedirectURL(url) {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();
  
      xhr.open('HEAD', url, true);
  
      xhr.onload = () => {
        resolve(xhr.responseURL);
      };
  
      xhr.send(null);
    });
}

export async function getRandomImage() {
    const uri = await invoke({ retry: 3, timeout: 5000 }, () =>
      getRedirectURL('https://picsum.photos/600/600/?random'),
    );
  
    return { uri, width: 600, height: 600 };
  }