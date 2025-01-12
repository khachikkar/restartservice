import { Carousel } from 'antd';

const contentStyle : React.CSSProperties = {
    height: '300px',
    width: '100%',
    objectFit: 'cover',
};




const Hero = ()=>{

    const onChange = (currentSlide : number) => {
        console.log(currentSlide);
    };


    return(
    <Carousel autoplay afterChange={onChange}>
        <div>
            <img 
                style={contentStyle} 
                src="https://media.miele.com/images/2000014/200001468/20000146836.png?impolicy=hero&imwidth=2000&x=0&y=440&w=5120&h=2880&" 
                alt="img" 
            />
        </div>
        <div>
            <img  style={contentStyle} src="https://homefeeling.co.uk/wp/wp-content/uploads/2023/08/AdobeStock_613132570-scaled.jpeg"
                 alt="img"/>
        </div>
        <div>
            <img  style={contentStyle} src="https://fcdrycleaners.com/wp-content/uploads/2023/11/How-To-Disinfect-A-Washing-Machine-A-Step-by-Step-Guide-998x570.jpg"
                 alt="img"/>

        </div>
    </Carousel>
    )
}

export default Hero