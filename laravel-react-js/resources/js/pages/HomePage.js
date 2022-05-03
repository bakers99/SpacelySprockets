import React from 'react';
import NavigationBar from '../components/NavigationBar'
import '../../css/HomePage.css';
import sss_building from '../../imgs/sss_building.jpg';
import mr_spacely from '../../imgs/mr_spacely.jpg';
import sprocket from '../../imgs/sprocket.gif';

const Home = () => {
    return (
        <>
            <NavigationBar />

            <div className="container">

                <img src={sss_building} alt="spacely space sprockets building" className="image-left"/>
                <h2>About the Company</h2>
                <p>
                    <b>Spacely Space Sprockets, Inc.</b> is a location in The Jetsons.
                </p>
                <p>
                    It is a business in Orbit City that manufactures sprockets. It is owned by Cosmo Spacely. Its main business rival is Cogswell's Cogs. It operates a plant on an asteroid in space.
                </p>

                <img src={mr_spacely} alt="Mr. Spacely" className="image-right"/>
                <h2>About the Owner</h2>
                <p>
                    <b>Cosmo Spacely</b> Spacely is CEO of Spacely Space Sprockets, Inc., and George Jetson's arrogant boss. His main rival is W.C. Cogswell, who is the CEO of Cogswell's Cogs. He is a distant descendant of a minor character from "the Flintstones" named Rockenshpeel.
                </p>
                <p>
                    Mr. Spacely is a short man wearing a moss green shirt with a blue tie and black slip-on pants. He has three hairs over his head to cover his bald spot, and has a toothbrush mustache.
                </p>
                <p>
                    Due to Mr. Spacely's short stature, he is very aggressive toward George and makes excuses to interfere with his personal life. In addition to making George's life more stressful, Spacely would frequently fire him for small misdoings.
                </p>

                <img src={sprocket} alt="spacely space sprockets building" className="image-left"/>
                <h2>About the Product</h2>
                <p>
                    A sprocket is a simple mechanical wheel with teeth or small notches which are designed to rotate and engage with the links of a chain or belt. To be compatible, though, they both need to have the same thickness and pitch.
                </p>
                <p>
                    The basic design of this device has been used all over the world for a long time. They look very similar to gears, however they aren’t designed to be meshed together. Sprockets are used for various different applications including bicycles, cars, motorcycles, tools and other machinery.
                </p>
                <p>
                    They’re often made from steel, which is hardwearing so it increases longevity. Sometimes they’re made from aluminium as it’s lighter, making it ideal for motorbikes or push bikes, however it does wear quicker than steel.
                </p>

            </div>
        </>
    )
}

export default Home;
