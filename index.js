const FAQ = [
    {
        q: "How much does Photoshop cost?",
        a: "Plans start at US$22.99/mo."
    },
    {
        q: "Can you use Photoshop to edit videos?",
        a: "Yes, you can use Photoshop to edit videos."
    },
    {
        q: "Is Photoshop available without a subscription?",
        a: "Photoshop is only available as part of a Creative Cloud plan, which includes the latest features, updates, fonts, and more."
    }
];

// add code here if needed
/**
 * 
 * @param {*} el 
 * @param {*} newClass 
 * @returns void
 */
const removeParentAndAddClass = (el,newClass='')=>{
    const parentNode = el.parentNode;
    const link = el.firstElementChild;
    const className = link.getAttribute("class")??'';
    link.setAttribute('class', `${className} ${newClass}`);
    parentNode.insertBefore(link,el);
    el.remove();
}
/**
 * 
 * @param {*} el 
 * @returns boolean
 */
const isElementVisible = (el)=>{
    const elPosition = el.getBoundingClientRect();
    return(elPosition.bottom >= 0)
}

function processBackgroundColor(el) {
    // add code here
    /**
     * 1. Obtain the text content of the first child element of "el". 
     * Add the found text content as a background to "el". 
     * You can assume there will always text content.
     */
    const firstChild = el.firstElementChild;
    const bgColor = firstChild.innerText??'#fff';
    el.style.background = bgColor;
    /**
     * 2. Remove the first child
     */
    firstChild.remove();

}
function processHero(el) {
    processBackgroundColor(el);
    // add code here
    /**
     * 1. If a paragraph has links, add the class "action-area" to the paragraph
     */
    el.querySelectorAll("p")?.forEach((para)=>{
        if(para.querySelectorAll("a").length>0){
            const className = para.getAttribute("class")??'';
            para.setAttribute('class', `${className} action-area`)
        }
    })
    /**
     * 2. If a link is inside a bold tag:
        a. add the class "con-button" to the link
        b. move the link outside of the bold tag
        c. delete the bold tag
     */
    el.querySelectorAll('b')?.forEach((bold)=>{
        if(bold.querySelector('a')){
            removeParentAndAddClass(bold,'con-button')
        }
    })
    /**
     * 3. If a link is inside an italics tag:
        a. add the classes "con-button blue" to the link
        b. move the link outside of the italics tag
        c. then delete the italics tag
     */
    el.querySelectorAll('i')?.forEach((italics)=>{
        if(italics.querySelector('a')){
            removeParentAndAddClass(italics,'con-button blue');
        }
    })
}
function processBrick(el) {
    processBackgroundColor(el);
    // add code here
    /**
     *  1. Add the class "title" to the first paragraph
        2. Add the class "price" to the second paragraph
        3. Add the class "description" to the third paragraph
     */
    const paras = el.querySelectorAll('p')??[];
    paras[0]?.setAttribute('class','title');
    paras[1]?.setAttribute('class','price');
    paras[2]?.setAttribute('class','description');
}
function processFaq(el) {
    // improve this code
    /**
     * 1. Make the function more flexible so that questions can easily be added or removed from the object
     */
    let faqContent = '';
    FAQ?.forEach((item,index)=>{
        faqContent +=`
        <div class="faq-set faq-closed" data-element-index=${index}>
            <div class="question">
                <div>
                    <h3>${item.q}</h3>
                </div>
            </div>
            <div class="answer">
                <div>
                    <p>${item.a}</p>
                </div>
            </div>
        </div>`
    })
    el.innerHTML = faqContent;
    // add code here
    /**
     * 2. Add the ability to click on a question to toggle the answer between open and closed states. 
     *      (bonus if you can get any open questions to close when you open a new one)
     */
    const faqs =  el.querySelectorAll('.faq-set');
    faqs?.forEach((q)=>{
        q.addEventListener('click',(e)=>{
            const elementIndex = e.currentTarget.dataset.elementIndex;
            faqs.forEach((item)=>{
                const  currentIndex = item.dataset.elementIndex;
                if(elementIndex!=currentIndex){
                    item.setAttribute('class','faq-set faq-closed')
                }
                else{
                    const classNames = e.currentTarget.getAttribute('class');
                    e.currentTarget.setAttribute('class',classNames.indexOf('faq-closed') !==-1?'faq-set faq-open':'faq-set faq-closed')
                }
            })
            
        })
    })

}
function processBanner(el) {
    // add code here
    /**
     * 1. If a link is inside a bold tag:
            a. add the classes "con-button" and "blue" to the link
            b. move the link outside of the bold tag
            c. delete the bold tag
     */
    el.querySelectorAll('b')?.forEach((bold)=>{
        if(bold.querySelector('a')){
            removeParentAndAddClass(bold,'con-button blue')
        }
    })

    /**
     * 2. Toggle the banner to only show when the "hero" div is completely off screen 
     * (bonus if you can make a small transition to slide up and down when revealing/hiding)
     */
    const hero = document.querySelector('.hero');
    const banner = document.querySelector('.banner');
    const body = document.querySelector('body');
    const hasScroll = body.scrollHeight>body.clientHeight;
    const heroVisible = isElementVisible(hero);

    // If the document dosen't have any scroll, ie. when the page is visible top to bottom, its probably better to show the banner
    if(!hasScroll){
        banner.setAttribute("class","banner appear");
    } 
    // When the hero is not visibile on load, ie. when page already scrolled to below hero when loaded banner, should be visible
    else if(!heroVisible){
         banner.style.visibility='visible';
    }
    // Listen to scroll event to identify the position of hero to show/hide banner
    document.addEventListener('scroll',()=>{
        const heroVisible = isElementVisible(hero);
        if(!heroVisible){
            banner.setAttribute("class","banner appear")
        }
        else{
            banner.setAttribute("class","banner close")
        }
    })
}
document.querySelectorAll('.hero').forEach(processHero);
document.querySelectorAll('.brick').forEach(processBrick);
document.querySelectorAll('.faq').forEach(processFaq);
document.querySelectorAll('.banner').forEach(processBanner);