package modules.M5_Advanced_DSA_1.L3_Arrays_3_Interview_Problems.Assignment;

public class Assignment3 {

  int firstMissingPositive(int[] A) {
    int N = A.length;
    int index = 0;

    while (index < N) {

      if (A[index] < 1 || A[index] > N) {
        index++;
      } else if (A[index] == index + 1) {
        index++;
      } else {
        int correctIndex = A[index] - 1;

        if (A[correctIndex] == A[index]) {
          index++;
        } else {
          int temp = A[index];
          A[index] = A[correctIndex];
          A[correctIndex] = temp;
        }
      }
    }
    for (int j = 0; j < N; j++) {
      if (A[j] != j + 1) {
        return j + 1;
      }
    }

    return N + 1;
  }
}
