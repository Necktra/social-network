import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';

const Header = (props) => {
    return (<header className={classes.header}>
        <img src='https://i.pinimg.com/originals/d9/3f/34/d93f341355683d63e28a63ec2bae31f6.png' width='50' height='40'></img>
    
        <div className={classes.loginBlock}>
            {props.isAuth? props.login : <NavLink to="/login">Login</NavLink>}
            
        </div>
        
    </header>
    )
}

export default Header;