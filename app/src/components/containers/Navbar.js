// @flow
import { connect } from 'react-redux';
import {
  openLoginModal,
  closeLoginModal,
} from '../../store/actions';
import NavbarUI from '../ui/NavbarUI';


const mapStateToProps = state => (
  {
    isLoginModalOpen: state.isLoginModalOpen,
  }
);

const mapDispatchToProps = dispatch => (
  {
    openModal() {
      dispatch(openLoginModal());
    },
    closeModal() {
      dispatch(closeLoginModal());
    },
  }
);

const Navbar = connect(mapStateToProps, mapDispatchToProps)(NavbarUI);

export default Navbar;
