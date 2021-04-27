import Admin from '../components/Admin/Admin'
import classes from './AdminLayout.module.css';



const AdminLayout = () => {
    return (
        <div>
            <div className={classes.Card}>
                <h1>Admin Layout</h1>
            </div>
            <div className={classes.Form}>
                <Admin></Admin>
            </div>
        </div>
    )
}

export default AdminLayout