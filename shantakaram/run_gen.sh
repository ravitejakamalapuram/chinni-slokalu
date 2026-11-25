cd $REEL_ROOT/shantakaram
: "${REEL_ROOT:=$(cd "$(dirname "$0")/.." && pwd)}"; export REEL_ROOT
python3 gen.py sloka.json raw ${MODEL:-gemini-3.1-flash-tts-preview} "Vishnu" \
 "పిల్లలూ! ఈ రోజు శ్రీ మహావిష్ణువు శ్లోకం, శాంతాకారం, నేర్చుకుందాం! పాల సముద్రంలో ఆదిశేషుని మీద ప్రశాంతంగా పడుకున్న విష్ణుమూర్తిని తలచుకుందాం!" \
 "చాలా బాగా చెప్పారు పిల్లలూ! ఓం నమో నారాయణాయ!" "$@"
