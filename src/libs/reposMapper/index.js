export const reposMapper = (rawReposRecord, favoriteRepos = []) => {
  const reposRecord = Object.create(null);
  reposRecord.totalCount = 0;
  let repos = [];

  if (rawReposRecord.items?.length > 0) {
    repos = rawReposRecord.items.map((r) => ({
      id: r.id,
      name: r.name,
      fullName: r.full_name,
      description: r.description,
      stars: r.stargazers_count,
      avatarUrl: r.owner?.avatar_url,
      isFavorite: favoriteRepos.some((fr) => fr.id === r.id),
      isActive: false,
    }));
  }

  reposRecord.repos = repos;
  reposRecord.totalCount = rawReposRecord.total_count;

  return reposRecord;
};
