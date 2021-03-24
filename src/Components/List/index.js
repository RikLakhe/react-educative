import ListItem from './ListItem'

const List = ({ list, onRemoveItem }) =>
  list.map(item => (
    <ListItem
      key={item.objectID}
      item={item}
      onRemoveItem={onRemoveItem}
    />
  ));

  export default List;