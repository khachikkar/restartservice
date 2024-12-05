import { GithubOutlined, InstagramOutlined, FacebookOutlined } from '@ant-design/icons';
import {Row, Col, Button} from 'antd';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer style={footerStyle}>
            <Row justify="space-between" align="middle">
                {/* Logo and Copyright Section */}
                <Col>
                    <h2>Restart Service</h2>
                </Col>
                <Col>
                    <span style={{ color: '#666' }}>&copy; {new Date().getFullYear()} All Rights Reserved</span>
                </Col>
                {/* Social Media Icons */}
                <Col>
                    <a href="https://github.com/khachikkar" target="_blank" rel="noopener noreferrer" style={iconStyle}>
                        <GithubOutlined />
                    </a>
                    <a href="https://www.instagram.com/khach.77/" target="_blank" rel="noopener noreferrer" style={iconStyle}>
                        <InstagramOutlined />
                    </a>
                    <a href="https://facebook.com/khachik.karapetyan2" target="_blank" rel="noopener noreferrer" style={iconStyle}>
                        <FacebookOutlined />
                    </a>
                    <Link to="/adminka"><Button>Admin Panel</Button></Link>
                </Col>
            </Row>
        </footer>
    );
};

const footerStyle = {
    borderTop: "1px solid #333",
    color: "black",
    padding: '20px 20px',
    width: '100%',
};

const iconStyle = {
    fontSize: '20px',
    color: '#000',
    marginLeft: '10px',
};

export default Footer;