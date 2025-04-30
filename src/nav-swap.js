// Direct Copy and paste in the "react.dev" website inspector console
(function(){
    const swapKey = 'reactMenuSwap';

    //Already swapped in this session; do nothing
    if(sessionStorage.getItem(swapKey)){
        return;
    }

    function swapMenuItems(){
        // Find the links with text "Reference" and "Community" in the page.
        const links = document.querySelectorAll('a');
        const referenceLink = Array.from(links).find(a => a.textContent.trim() === 'Reference');
        const communityLink = Array.from(links).find(a => a.textContent.trim() === 'Community');

        //Exist if either link is missing.
        if(!referenceLink || !communityLink){
            return;
        } 

        //Find each link's parent <li> or direct parent element.
        const referenceItem = referenceLink.closest('li') || referenceLink.parentElement;
        const communityItem = communityLink.closest('li') || communityLink.parentElement;

        //Ensur they share same parent node.
        if(!referenceItem || !communityItem || referenceItem.parentNode !== communityItem.parentNode){
            return;
        } 

        const parent = referenceItem.parentNode;

        //Swap the two items by using a temoprary placeholder element.
        const placeholder = document.createElement(referenceItem.nodeName);
        parent.replaceChild(placeholder, referenceItem);
        parent.replaceChild(referenceItem, communityItem);
        parent.replaceChild(communityItem, placeholder);


        //Mark as swapped in this session.
        sessionStorage.setItem(swapKey, 'true');

    }

    // Run the swap function when the page is fully loaded.
    if(document.readyState === 'loading'){
        document.addEventListener('DOMContentLoaded', swapMenuItems);
    }else{
        swapMenuItems();
    }

})(); 