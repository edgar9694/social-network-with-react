import React, { useState, useEffect } from 'react'
import { Button, Spinner, Toast } from "react-bootstrap";
import { toast } from "react-toastify";
import { withRouter} from "react-router-dom"
import useAuth from "../../hooks/useAuth";
import BasicLayout from"../../layout/BasicLayout";
import BannerAvatar from "../../components/User/BannerAvatar";
import InfoUser from "../../components/User/InfoUser";
import ListTweets from "../../components/ListTweets";
import { getUserTweetApi } from "../../api/tweet";
import { getUserApi } from "../../api/user"; 


import "./User.scss";
import { result } from 'lodash';

function User(props) {
    const { match, setRefreshCheckLogin } = props
    const { params } = match
    const [user, setUser] = useState(null)
    const [tweets, setTweets] = useState(null)
    const [page, setPage] = useState(0);
    const [loadingTweets, setLoadingTweets] = useState(false)
    const loggedUser = useAuth();

    useEffect(() => {
        getUserApi(params.id)
        .then(response =>{
            setUser(response)
            if (!response) toast.error("El usuario que ha visitado no existe")
        })
        .catch(() => {
            toast.error("El usuario que ha visitado no existe")
        })
    }, [params])

    useEffect(() => {
        getUserTweetApi(params.id, 1)
            .then(response => {
                setTweets(response)
            })
            .catch(setTweets([]));
    }, [params])

    const moreData = () =>{
       const pageTemp = page + 1;
       setLoadingTweets(true)

       getUserTweetApi(params.id, pageTemp).then(response =>{
            if(!response) {
                setLoadingTweets(0);
            } else {
                setTweets([...tweets,...response]);
                setPage(pageTemp);
                setLoadingTweets(false);
            }
       })

    }


    return (
        <BasicLayout className="user" setRefreshCheckLogin={setRefreshCheckLogin}>
                <div className="user__title">
                    <h2>
                        {user ? `${user.firstName} ${user.lastName}`: "Este usuario no existe"}
                    </h2>
                </div>
                <BannerAvatar user={user} loggedUser={loggedUser}/>
                <InfoUser user={user} />
                <div className="user__tweets">
                    <h3>Tweets</h3>
                    {tweets && <ListTweets tweets={tweets} />}
                    <Button onClick={moreData}>
                        {!loadingTweets ? (
                            loadingTweets !== 0 && "Obtener más tweets"
                        ) : (
                        <Spinner 
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            arian-hidden="true"
                        />
                        )}
                    </Button>
                </div>
        </BasicLayout>
    )
}


export default withRouter(User)