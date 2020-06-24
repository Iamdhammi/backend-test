import React from 'react';
import { Button } from 'semantic-ui-react';
import Navbar from '../components/Navbar';
import { checkPropTypes } from 'prop-types';
import { connect } from 'react-redux';

function Index(props) {
    const {isLoggedin, history}= props;
    React.useEffect(() => {
        changeBackground();
    }, []);

     React.useEffect(() => {
        // const token = localStorage.getItem('eventToken')
        if(isLoggedin) {
            history.push('/dashboard');
        }
    }, [isLoggedin, history]);

    const changeBackground = () => {
        var bg = [
            './images/3321793.jpg', 
            './images/5308938_1280.jpg',
            './images/2893715_1280.jpg'
        ];
        var active = 0;
        
            setInterval(function(){
                if(document.querySelector('.landingPage__bg')) {
                    document.querySelector('.landingPage__bg').style.backgroundImage = `url(${bg[active]})`;
                    active++;
                    if (active == bg.length) active = 0;
                }
            }, 10000);
        
    };

    return (
        <div>
            <div className="landingPage-nav">
                <Navbar history={props.history} />
            </div>
            <div className="landingPage">
                <div id="bg" className="landingPage__bg landingPage__bg--animate"></div>
                <div className="landingPage__overlay"></div>
                <div className="landingPage__content">
                    <h1>MANAGE YOUR EVENT, MANAGE YOUR TALK!</h1>
                    <p>Your brand, your design. It's all about your event and your attendees</p>
                    <Button className="landingPage__content--btn">GET STARTED</Button>
                </div>
            </div>
        </div>
    )
}

const mapStatToProps = ({ auth }) => {
    return {
        isLoggedin: auth.isLoggedin,
    }
}


export default connect(
    mapStatToProps,
    {}
)(Index);