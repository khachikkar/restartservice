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
            <img style={contentStyle} src="https://www.domesticandgeneral.com/blog/cms/assets/b7728dd9-d1d2-4a3a-b059-d30a5f9826d0/man-crouching-by-washing-machine-compressed.png" alt="img" />
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