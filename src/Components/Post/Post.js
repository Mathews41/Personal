import React, {useState, useEffect} from 'react';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import './Post.css'




function Post(props) {
    const [picture, setPicture] = useState('')
    const [make, setMake] = useState('') 
    const [model, setModel] = useState('') 
    const [year, setYear] = useState('') 
    const [title, setTitle] = useState('') 
    const [content, setContent] = useState('') 
    const [id, setID] = useState(-1)
    const [edit, setEdit] = useState(false)
    const [data, setData] = useState(null)


    useEffect(() => {
        setID(props.match.params.id)
        console.log(props.match)
        axios.get(`/api/post/${id}`).then ((res) => {
            console.dir(res.data)
            setData(res.data)
            setPicture(res.data.url)
            setMake(res.data.make)
            setModel(res.data.model)
            setYear(res.data.year)
            setTitle(res.data.title)
            setContent(res.data.content)

        })
    },[props.match, id])

    const cancelNeedsreload = () => {
        axios.get(`/api/post/${id}`).then ((res) => {
            console.dir(res.data)
            setData(res.data)
            setPicture(res.data.url)
            setMake(res.data.make)
            setModel(res.data.model)
            setYear(res.data.year)
            setTitle(res.data.title)
            setContent(res.data.content)
        })
    }

    const onSubmit = () => {
        console.log(picture, title, content)
        axios.put(`/api/post/${id}`,{title, make, model, year, picture, content}).then(() => {
            axios.get(`/api/post/${id}`).then ((res) => {
                console.dir(res.data)
                setPicture(res.data.url)
                setMake(res.data.make)
                setModel(res.data.model)
                setYear(res.data.year)
                setTitle(res.data.title)
                setContent(res.data.content)
                setEdit(false)
    
            })
        })
    }
    const onDelete = () => {
        axios.delete(`/api/post/${id}`).then(() => {
            props.history.push('/dashboard')
        })
    }
    const onCancel = () => {
       cancelNeedsreload() 
       setEdit(false)
        
    }
    

  return (
    
    <Card className='card'>
        <CardActionArea id='action-area'>
            {edit? 
                null
                :
                <CardMedia
                className='cardmedia'
                image={picture}
                title={title}
                />}
            <CardContent className='cardContent' >
                {edit? <input className='img' name='picture' placeholder='Image' onChange={(e) => setPicture(e.target.value)}/> :
            null}
                {edit ? 
                    <input name='Title' placeholder='Title' onChange={(e) => setTitle(e.target.value)}></input>
                    :
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                }
                {edit ? 
                    <input className='input' name='Year' placeholder='Year' onChange={(e) => setYear(e.target.value)}></input>
                    :
                    <Typography gutterBottom variant="h5" component="h2">
                        {year}
                    </Typography>
                }
                {edit ? 
                    <input className='input' name='Make' placeholder='Make' onChange={(e) => setMake(e.target.value)}></input>
                    :
                    <Typography gutterBottom variant="h5" component="h2">
                        {make}
                    </Typography>
                }
                {edit ? 
                    <input className='input' name='Model' placeholder='Model' onChange={(e) => setModel(e.target.value)}></input>
                    :
                    <Typography gutterBottom variant="h5" component="h2" size='18pt'>
                        {model}
                    </Typography>
                }
                
                {edit ? 
                    <input name='Content' placeholder='Content' onChange={(e) => setContent(e.target.value)}/>
                    :
                    <Typography variant="body2" component="p">
                    {content}
                    </Typography>
                }
            </CardContent>
        </CardActionArea>
        <CardActions className="cardbtns">
            <div className="btns">
                {edit ?  
                    <Button className='btn' onClick={onCancel} size="small" >
                    Cancel
                    </Button>
                    :
                    <Button className='btn' onClick={() => setEdit(!edit)} size="small">
                    Edit
                    </Button>
                }
                {edit ?  
                    <Button onClick={onSubmit} size="small">
                    Submit
                    </Button>
                    :
                    <Button className='btn' onClick= {onDelete} size="small">
                    Delete
                    </Button>
                }
            </div>
      </CardActions>
    </Card>
  );
}

export default withRouter(Post) 