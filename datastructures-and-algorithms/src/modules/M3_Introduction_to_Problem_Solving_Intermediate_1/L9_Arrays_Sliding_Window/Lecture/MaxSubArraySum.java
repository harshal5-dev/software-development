package modules.M3_Introduction_to_Problem_Solving_Intermediate_1.L9_Arrays_Sliding_Window.Lecture;

public class MaxSubArraySum {

  static int findMaxSubArraySumBruteForce(int[] A, int K) {
    int ans = Integer.MIN_VALUE;
    int s = 0;
    int e = K-1;
    int N = A.length;

    while (e < N) {
      int sum = 0;

      for (int index = s; index <= e; index++) {
        sum += A[index];
      }

      s++;
      e++;
      ans = Math.max(ans, sum);
    }

    return ans;
  }

  static int findMaxSubArrayPrefixSum(int[] A, int K) {
    int N = A.length;
    int[] prefixSum = new int[N];

    prefixSum[0] = A[0];

    for (int index = 1; index < N; index++) {
      prefixSum[index] = prefixSum[index - 1] + A[index];
    }

    int ans = Integer.MIN_VALUE;
    int s = 0;
    int e = K -1;

    while (e < N) {
      int sum = prefixSum[e];

      if (s > 0) {
        sum -= prefixSum[s - 1];
      }

      ans = Math.max(ans, sum);
      s++;
      e++;
    }

    return ans;
  }

  static int findMaxSubArraySlidingWindow(int[] A, int K) {
    int N = A.length;
    int sum = 0;

    for (int index = 0; index < K; index++) {
      sum += A[index];
    }

    int ans = sum;
    int s = 1;
    int e = K;

    while (e < N) {
      sum -= A[s - 1] + A[e];
      ans = Math.max(ans, sum);
      s++;
      e++;
    }

    return ans;
  }
}
