import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  item: {
    paddingLeft: 5,
    paddingRight: 20,
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    marginRight: 10,
    width: 20,
    height: 20,
    objectFit: 'contain',
  },
  name: {
    textTransform: 'none',
  },
  root: {
    display: 'flex',
    position: 'absolute',
    right: 'calc(100%  + 30px)',
    top:'50%',
    transform:'translate(0, -50%)',
    border: '0.5px solid rgba(255,255,255, 0.6)',
  },
  paper: {
    marginRight: 20,
  }
 
});

export default useStyles;
