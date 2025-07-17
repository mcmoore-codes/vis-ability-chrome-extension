  //increase/decrease font size
  document.addEventListener('DOMContentLoaded', () => {
    const increaseFontButton = document.getElementById('increaseFont');
    const decreaseFontButton = document.getElementById('decreaseFont');
    const fontSizeElement = document.getElementById('fontSize');
    const minFontSizeElement = document.getElementById('minFont');
    const resetFontElement = document.getElementById('resetFont');

    function updateFontSize(newFontSize){
      chrome.fontSettings.setDefaultFontSize({pixelSize: newFontSize}, () => {
        fontSizeElement.textContent = newFontSize.toString();
      });
    }

    function updateMinFontSize(newMinFontSize) {
      chrome.fontSettings.setMinimumFontSize({ pixelSize: newMinFontSize });
    }

    increaseFontButton.addEventListener('click', () => {
      chrome.fontSettings.getDefaultFontSize({}, (fontInfo) => {
        const newFontSize = fontInfo.pixelSize + 2;
        updateFontSize(newFontSize);
      });
    });
  
    decreaseFontButton.addEventListener('click', () => {
      chrome.fontSettings.getDefaultFontSize({}, (fontInfo) => {
        const newFontSize = fontInfo.pixelSize - 2;
        updateFontSize(newFontSize);
      });
    });

     minFontSizeElement.addEventListener('change', () => {
      const newMinFontSize = parseInt(minFontSizeElement.value);
      updateMinFontSize(newMinFontSize);
    });

  });

  //Change Background Color

  document.addEventListener('DOMContentLoaded', () => {
  
  document.getElementById('changeColor').addEventListener('input', async () => {
    const color = document.getElementById('changeColor').value;
   

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

   
    chrome.scripting.executeScript({
      target: { tabId: tab.id},
      func: changeBackgroundColor,
      args: [color]
    });
  });
  
 function changeBackgroundColor(color) {
   document.body.style.backgroundColor = color;
 }
  
});

//Change Font Color
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('changeTextColor').addEventListener('input', async () => {
      const textColor = document.getElementById('changeTextColor').value;
      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
      chrome.scripting.executeScript({
        target: { tabId: tab.id},
        func: changeFontColor,
        args: [textColor]
      });
    });
    
    function changeFontColor(textColor) {
      document.body.style.color = textColor;
    }
    
  });
  
  

