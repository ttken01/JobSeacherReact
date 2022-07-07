import PropTypes from 'prop-types';

export default function CenterDiv(props) {
    const children = props.children;
    return(
        <div className="center-div">
            {children}
        </div>
    )

}


CenterDiv.propTypes = {
    children: PropTypes.node,
  }
  
  CenterDiv.defaultProps = {
    children: null,
  }