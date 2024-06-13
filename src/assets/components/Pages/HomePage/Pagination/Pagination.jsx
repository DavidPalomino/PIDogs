import style from './Pagination.module.css'

export const Pagination = ({totalPost, postPerPage, setCurrentPage, currentPage}) => {
    let pages = []

    for (let i = 1; i <= Math.ceil(totalPost/postPerPage); i++) {
        pages.push(i)
    }
  return (
    <div className={style.Pagination}>
        {
            pages.map((page, index) => {
                return <button key={index} onClick={() => setCurrentPage(page)} className={page == currentPage ? style.active : ''}>{page}</button>
            })
        }
    </div>
  );
};
