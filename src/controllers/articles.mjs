import { articles } from '../data/articles.mjs'

export function listArticles(req, res) {
  const allArticles = Array.from(articles.entries()).map(([id, article]) => ({ id, ...article }))
  res.status(200).json(allArticles)
}

export function createArticle(req, res) {
  const { title } = req.body
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).send('Bad Request')
  }

  const articleId = Date.now().toString()
  articles.set(articleId, { title: title.trim() })

  res.status(201).json({ id: articleId, title: title.trim() })
}

export function getArticle(req, res) {
  const article = articles.get(req.params.articleId)
  if (!article) {
    return res.status(404).send('Not Found')
  }
  res.status(200).json({ id: req.params.articleId, ...article })
}

export function updateArticle(req, res) {
  const article = articles.get(req.params.articleId)
  if (!article) {
    return res.status(404).send('Not Found')
  }

  const { title } = req.body
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).send('Bad Request')
  }

  articles.set(req.params.articleId, { title: title.trim() })
  res.status(200).json({ id: req.params.articleId, title: title.trim() })
}

export function deleteArticle(req, res) {
  if (!articles.has(req.params.articleId)) {
    return res.status(404).send('Not Found')
  }
  articles.delete(req.params.articleId)
  res.status(204).send()
}
