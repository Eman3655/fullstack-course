const Persons = ({ persons, onDelete }) => {
  return (
    <>
      {persons.map((p) => (
        <div key={p.id}>
          {p.name} {p.number}
        <button onClick={() => onDelete(p.id, p.name)}>
            delete
        </button>
        </div>
      ))}
    </>
  );
};

export default Persons;
