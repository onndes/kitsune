export const handleScrollMorePage = (
  event: React.UIEvent<HTMLDListElement>,
  hasNext: boolean,
  loading: boolean,
  fetchNext: () => void
) => {
  const { scrollTop, scrollHeight, clientHeight } =
    event.target as HTMLDivElement;
  if (scrollHeight - scrollTop <= clientHeight + 10 && hasNext && !loading) {
    fetchNext();
  }
};
