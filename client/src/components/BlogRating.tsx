import { useState } from "react";
import { trpc } from "../lib/trpc";

interface BlogRatingProps {
  articleId: number;
}

export function BlogRating({ articleId }: BlogRatingProps) {
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { data: stats, refetch } = trpc.blogRating.getStats.useQuery({ articleId });
  const submitMutation = trpc.blogRating.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      refetch();
      
      // GTM event
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'rating_submit',
          article_id: articleId,
          rating: selectedRating,
          has_feedback: feedback.length > 0,
          feedback_length: feedback.length,
        });
      }
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedRating === 0) {
      alert("Wybierz ocenę (1-5 gwiazdek)");
      return;
    }

    submitMutation.mutate({
      articleId,
      rating: selectedRating,
      feedback: feedback.trim() || undefined,
    });
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => setSelectedRating(star)}
        onMouseEnter={() => setHoverRating(star)}
        onMouseLeave={() => setHoverRating(0)}
        className="text-3xl transition-all hover:scale-110 focus:outline-none"
        aria-label={`${star} gwiazdek`}
      >
        {(hoverRating >= star || selectedRating >= star) ? (
          <span className="text-[#c7ff4e]">★</span>
        ) : (
          <span className="text-gray-600">☆</span>
        )}
      </button>
    ));
  };

  if (submitted) {
    return (
      <div className="bg-[#0b1020] border border-[#c7ff4e]/20 rounded-lg p-6 text-center">
        <div className="text-[#c7ff4e] text-5xl mb-3">✓</div>
        <h3 className="text-xl font-bold text-white mb-2">Dziękujemy za ocenę!</h3>
        <p className="text-gray-400">
          Twoja opinia pomaga nam tworzyć lepsze treści.
        </p>
        {stats && stats.totalRatings > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-800">
            <p className="text-sm text-gray-400">
              Średnia ocena: <span className="text-[#c7ff4e] font-bold">{stats.averageRating}/5</span> ({stats.totalRatings} {stats.totalRatings === 1 ? 'ocena' : 'ocen'})
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-[#0b1020] border border-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-2">Oceń ten artykuł</h3>
      <p className="text-gray-400 mb-4 text-sm">
        Twoja opinia pomaga nam tworzyć lepsze treści dla Ciebie
      </p>

      {stats && stats.totalRatings > 0 && (
        <div className="mb-4 pb-4 border-b border-gray-800">
          <p className="text-sm text-gray-400">
            Średnia ocena: <span className="text-[#c7ff4e] font-bold">{stats.averageRating}/5</span> ({stats.totalRatings} {stats.totalRatings === 1 ? 'ocena' : stats.totalRatings < 5 ? 'oceny' : 'ocen'})
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-2 mb-4">
          <label className="text-white text-sm font-medium">Twoja ocena:</label>
          <div className="flex gap-1">
            {renderStars()}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="feedback" className="block text-white text-sm font-medium mb-2">
            Opcjonalny komentarz (max 500 znaków)
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value.slice(0, 500))}
            placeholder="Co sądzisz o tym artykule? Co możemy poprawić?"
            className="w-full bg-[#1a1f35] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#c7ff4e] transition-colors resize-none"
            rows={4}
          />
          <p className="text-xs text-gray-500 mt-1">{feedback.length}/500 znaków</p>
        </div>

        <button
          type="submit"
          disabled={submitMutation.isPending || selectedRating === 0}
          className="w-full bg-[#c7ff4e] text-[#0b1020] font-bold py-3 px-6 rounded-lg hover:bg-[#b3e645] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitMutation.isPending ? "Wysyłanie..." : "Wyślij ocenę"}
        </button>
      </form>
    </div>
  );
}
