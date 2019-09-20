import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import {withRouter} from 'react-router-dom'

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 150,
  },
});

function Post(props) {
    const [picture, setPicture] = useState('') 
    const [title, setTitle] = useState('') 
    const [content, setContent] = useState('') 
    const [id, setID] = useState(-1)
    const [edit, setEdit] = useState(false)


    useEffect(() => {
        setID(props.match.params.id)
        console.log(props.match)
        axios.get(`/api/post/${id}`).then ((res) => {
            console.dir(res.data)
            setPicture(res.data.url)
            console.log(res.data.url)
            setTitle(res.data.title)
            setContent(res.data.content)

        })
    },[props.match, id])

    const onSubmit = () => {
        console.log(picture, title, content)
        axios.put(`/api/post/${id}`,{title, picture, content}).then(() => {
            axios.get(`/api/post/${id}`).then ((res) => {
                console.dir(res.data)
                setPicture(res.data.url)
                console.log(res.data.url)
                setTitle(res.data.title)
                setContent(res.data.content)
                setEdit(false)
    
            })
        })
    }
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        {edit? <input name='picture' onChange={(e) => setPicture(e.target.value)}/>
        :
        <CardMedia
          className={classes.media}
          image={picture}
          title={title}
        />}
        <CardContent>
        {edit ? 
            <input name='title' onChange={(e) => setTitle(e.target.value)}/>
            :
            <Typography gutterBottom variant="h5" component="h2">
                {title}
            </Typography>
        }
        {edit ? 
            <input name='Content' onChange={(e) => setContent(e.target.value)}/>
            :
            <Typography variant="body2" color="textSecondary" component="p">
            {content}
            </Typography>
        }
            </CardContent>
            </CardActionArea>
            <CardActions>
        {edit ?  
            <Button size="small" color="primary">
            Cancel
            </Button>
            :
            <Button onClick={() => setEdit(!edit)} size="small" color="primary">
            Edit
            </Button>
        }
        {edit ?  
            <Button onClick={onSubmit} size="small" color="primary">
            Submit
            </Button>
            :
            <Button onClick= {() => this.handleDeletePost(this.props.vehicle.id)} size="small" color="primary">
            Delete
            </Button>
        }
      </CardActions>
    </Card>
  );
}

export default withRouter(Post) 