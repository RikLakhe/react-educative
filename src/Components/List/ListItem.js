import style from './ListItem.module.css'


const ListItem = ({ item, onRemoveItem }) => (
  <>
  {
    item && <div>
      <span>
        <a className={style.link} href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <span>
        <button type="button" onClick={() => onRemoveItem(item)}>
          Dismiss
        </button>
      </span>
    </div>
  }
  </>
    
  );

  export default ListItem;