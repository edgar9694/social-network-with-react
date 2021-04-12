import React from 'react';
import moment from "moment";
import localization from "moment/locale/es-mx";
import { Location, Link, DateBirth} from"../../../utils/icons";

import "./InfoUser.scss";

export default function InfoUser(props) {
    const { user } = props;

    return (
        <div className="info-user">
            <h2 className="name">
                {user?.firstName} {user?.lastName}
            </h2>
            <p className="email">
                {user?.email}
            </p>
            {user?.biography && <div className="description">{user?.biography}</div>}

            <div className="more-info">
                {user?.address && (
                    <p>
                        <Location />
                        {user.address}
                    </p>
                )}
                {user?.webSite && (
                    <a
                        href={user.webSite}
                        alt={user.webSite}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Link />{user.webSite}
                    </a>
                )}
                 {user?.birthDate && (
                    <p>
                        <DateBirth />
                        {moment(user.birthDate).locale("es", localization).format("LL") }
                    </p>
                )}
            </div>
        </div>
    )
}
