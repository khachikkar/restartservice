import { Button, Drawer } from "antd";
import logo from "../../img/logo.png"
import { Link } from "react-router-dom";
import { handleClick } from "../../helpers/telnum";
import { useState, useEffect } from "react";
import { MenuOutlined } from "@ant-design/icons";
import "./styles.css";

const categories = ["Սառնարան", "ԼվացքիՄեքենա", "Գազօջախ", "Վառարան", "ՍպասքիՄեքենա", "Չորանոց", "Սառցարան"];

const MyHeader = () => {
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const showDrawer = () => {
        setIsDrawerVisible(true);
    };

    const onClose = () => {
        setIsDrawerVisible(false);
    };

    const renderNavItems = () => (
        <nav className="nav-menu">
            {categories.map((category) => (
                <Link
                    key={category}
                    to={`/category/${category}`}
                    className="nav-item"
                    onClick={() => setIsDrawerVisible(false)}
                >
                    {category}
                </Link>
            ))}
        </nav>
    );

    return (
        <div className="myHeader">
            <div className="header-left">
                <Link to="/">
                    <img 
                        style={{ height: "40px" }}
                        alt="logo"
                        src={logo}
                    />
                </Link>
            </div>

            {isMobile ? (
                <>
                    <Button 
                        className="menu-button"
                        icon={<MenuOutlined />} 
                        onClick={showDrawer}
                    />
                    <Drawer
                        title="Menu"
                        placement="right"
                        onClose={onClose}
                        open={isDrawerVisible}
                        className="mobile-drawer"
                        rootClassName="mobile-drawer"
                        width={280}
                        destroyOnClose={true}
                    >
                        {renderNavItems()}
                    </Drawer>
                </>
            ) : (
                <div className="header-center">
                    {renderNavItems()}
                </div>
            )}

            <div className="header-right">
                <Button type="primary" onClick={handleClick}>
                    Զանգեք Մեզ
                </Button>
            </div>
        </div>
    );
};

export default MyHeader;