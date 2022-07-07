import JobItem from './JobItem'


function TabItem(props) {
    const { children, value, index, ...other } = props;
    return (
      <div className="tab-item">
          <JobItem data={props.data}/>
      </div>
    );
  }
  

  export default TabItem;