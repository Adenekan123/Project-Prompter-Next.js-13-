import PromptCard from "./PromptCard";

const Profile = ({ loading, name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        {" "}
        <span className="blue_gradient">{name}</span> Profile
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {loading ? (
          <div>Loading...</div>
        ) : (
          data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Profile;
