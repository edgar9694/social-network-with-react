import React, { useState, useCallback } from 'react';
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify"
import { API_HOST } from "../../../utils/constants";
import { Camara } from "../../../utils/icons";
import { uploadBannerApi, uploadAvatarApi, updateInfoApi } from "../../../api/user";


import "./EditUserForm.scss";

export default function EditUserForm(props) {
    const { user, setShowModal } = props
    const [formData, setFormData] = useState(initialValue(user))
    const [bannerURl, setBannerURl] = useState(
        user?.banner ? `${API_HOST}/obtenerbanner?id=${user.id}` : null
    );
    const [bannerFile, setBannerFile] = useState(null)
    const [avatarUrl, setAvatarUrl] = useState(
        user?.avatar ? `${API_HOST}/obteneravatar?id=${user.id}` : null
    )
    const [avatarFile, setAvatarFile] = useState(null)
    const [loading, setLoading] = useState(false)

    const onDropBanner = useCallback(acceptedFile => {
        const file = acceptedFile[0];
        setBannerURl(URL.createObjectURL(file))
        setBannerFile(file)
    });

    const { 
        getRootProps: getRootBannerProps, 
        getInputProps: getInputBannerProps 
    } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop: onDropBanner
    });

    const onDropAvatar = useCallback(acceptedFile => {
        const file = acceptedFile[0];
        setAvatarUrl(URL.createObjectURL(file))
        setAvatarFile(file)
    });
     
    
    const {
        getRootProps: getRootAvatarProps,
        getInputProps: getInputAvatarProps
     } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop: onDropAvatar
    });
    
    const onChange =  e => {
        setFormData({...formData, [e.target.name]: e.target.value })
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        console.log("Editando usuario");
        // console.log(formData);
        // console.log(bannerFile);
        // console.log(avatarFile);
        if(bannerFile){
            await uploadBannerApi(bannerFile).catch(() =>{
                toast.error("Error al subir el nuevo banner")
            })
        }

        if(avatarFile){
            await uploadAvatarApi(avatarFile).catch(() =>{
                toast.error("Error al subir el nuevo avatar")
            })
        }

        await updateInfoApi(formData).then(() =>{
            setShowModal(false);
        })
        .catch(()=>{
            toast.error("Error al actualizar los datos")
        })
        
        setLoading(false);
        window.location.reload();
    };


    return (
        <div className="edit-user-form">
            <div 
                className="banner" 
                style={{backgroundImage: `url('${bannerURl}')`}}
                {...getRootBannerProps()}
            >
                <input {...getInputBannerProps()} />
                <Camara />
            </div>
            <div 
                className="avatar" 
                style={{backgroundImage: `url('${avatarUrl}')`}}
                {...getRootAvatarProps()}
            >
                <input {...getInputAvatarProps()} />
                <Camara />
            </div>
            <Form onSubmit={onSubmit}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control 
                                type="text"
                                placeholder="Nombre"
                                name="firstName"
                                defaultValue={formData.firstName}
                                onChange={onChange}
                            />
                        </Col>
                        <Col>
                            <Form.Control 
                                type="text"
                                placeholder="Appelido"
                                name="lastName"
                                defaultValue={formData.lastName}
                                onChange={onChange}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Form.Control 
                        as="textarea"
                        row="3"
                        placeholder="Agrega tu biografia"
                        type="text"
                        name="biography"
                        defaultValue={formData.biography}
                        onChange={onChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control 
                        type="text"
                        placeholder="Sitio Web"
                        name="webSite"
                        defaultValue={formData.webSite}
                        onChange={onChange}
                    />
                </Form.Group>
                <Form.Group>
                    <DatePicker
                        placeholder="Fecha de nacimiento"
                        locale={es}
                        selected={new Date(formData.birthDate)}
                        onChange={data => setFormData({...formData, birthDate: data})}
                        
                    ></DatePicker>
                </Form.Group>
                <Button className="btn-submit" variant="primary" type="submit">
                    {loading && <Spinner animation="border" size="sm" />} Actualizar
                </Button>
            </Form>
        </div>
    )
}

function initialValue(user){
    return {
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        address: user.address || "",
        biography: user.biography || "",
        webSite: user.webSite || "",
        birthDate: user.birthDate || "",
    }
}