import { useState, useEffect } from 'react';
import { Folder, FolderPlus, File, FilePlus } from 'react-feather';
import { getData, postData, postImage } from '../../utils/fetchData';
import axios from 'axios';
import styles from '../../styles/course/Resource.module.scss';
import courseQueries from '../../utils/courseQueries';
import { useRouter } from 'next/router';
import { addResources } from '../../store/features/resourceSlice';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../core/Input';
import Button from '../core/Button';

const ResourcePage = ({ course, user }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [add, setAdd] = useState();
  const [addFile, setAddFile] = useState();
  const [currentFolder, setCurrentFolder] = useState(null);
  const [folderTitle, setFolderTitle] = useState('');
  const [path, setPath] = useState(router.query.path ? router.query.path.split('/') : [null]);

  useEffect(async () => {
    const res = await getData(`resources/${course._id}`);
    dispatch(
      addResources({
        [course.name]: { folders: res.folders, files: res.files },
      })
    );
  }, []);


  useEffect(() => {
    const i = path.indexOf(currentFolder);
    setPath(path.slice(0, i + 1));
    const pathString = null + path.join('/');
    courseQueries({router, folderPath: pathString})
  }, [currentFolder]);

  const resources = useSelector((state) => state.resources.value[course.name]);
  if (!resources) return null;
  const { files, folders } = resources;

  const handleClick = async (folderId) => {
    if (!path.includes(folderId)) {
      path.push(folderId);
    }
    setCurrentFolder(folderId);
  };

  const uploadResource = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', addFile);
    axios.post(`http://localhost:8000/resources/file/upload/${course._id},${currentFolder}`, data, {});
  };

  const createFolder = async (e) => {
    e.preventDefault()
    await postData('resources/folder/create', {title: folderTitle, course:course._id, parent_id: currentFolder}).then(res=>console.log(res));
  };

  return (
    <div className="resourcePage">
      <div className={styles.pathDiv}>
        <p onClick={() => setCurrentFolder(null)}>{course.name}/</p>
        {path.map((folderId) =>
          folders.map((folder) => {
            if (folder._id === folderId) {
              return (
                <p
                  onClick={() => {
                    setCurrentFolder(folder._id);
                  }}>
                  {folder.title}/
                </p>
              );
            }
          })
        )}
      </div>
      <div className={styles.resources}>
        {folders &&
          folders.map((folder) => {
            if (folder.parent_id === currentFolder)
              return (
                <div
                  className={styles.resource}
                  onClick={() => handleClick(folder._id)}>
                  <Folder width="50px" height="50px" />
                  <p>{folder.title}</p>
                </div>
              );
            else return null;
          })}
        {files &&
          files.map((file) => {
            if (file.parent_id === currentFolder) {
              return (
                <div className={styles.resource}>
                  <File width="50px" height="50px" />
                  <p>{file.title}</p>
                </div>
              );
            }
          })}
        <div className={styles.resource}>
          <FolderPlus
            width="50px"
            height="50px"
            onClick={() => (add === 'folder' ? setAdd() : setAdd('folder'))}
          />
          {add === 'folder' ? (
            <form onSubmit={createFolder}>
              <Input type="primary" value={folderTitle} onChange={(e)=>{setFolderTitle(e.target.value)}} placeholder="folder title" />
              <Button type="submit" class="primary">
                Upload
              </Button>
            </form>
          ) : (
            <p>Add a folder</p>
          )}
        </div>
        <div className={styles.resource}>
          <FilePlus
            width="50px"
            height="50px"
            onClick={() => (add === 'file' ? setAdd() : setAdd('file'))}
          />
          {add === 'file' ? (
            <form onSubmit={uploadResource}>
              <Input
                type="file"
                class="primary"
                name="upload"
                onChange={(e) => setAddFile(e.target.files[0])}
              />
              <Button type="submit" class="primary">
                Upload
              </Button>
            </form>
          ) : (
            <p>Add a file</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourcePage;
