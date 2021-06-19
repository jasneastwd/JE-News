import { Link } from 'react-router-dom';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';

// const useStyles = makeStyles(() => ({
//   root: {
//     flexGrow: 1,
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

// const Header = () => {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <AppBar position='static'>
//         <Toolbar>
//           <Typography variant='h6' className={classes.title}>
//             <Link to='/' className='app-heading'>
//               jasneastwd news{' '}
//             </Link>
//           </Typography>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// };

const Header = () => {
  return (
    <header className="Header">
      <h1>
        <Link to="/" className="app-heading">
          jasneastwd news{' '}
        </Link>
      </h1>
    </header>
  );
};

export default Header;
