package modules.M4_Introduction_to_Problem_Solving_Intermediate_2.L16_Sorting.Assignment;

import java.util.ArrayList;
import java.util.Comparator;


class MyComparator implements Comparator<Integer> {


  int countFactors(int A) {
    int ans = 0;

    for (int num = 1; num * num <= A; num++) {

      if (A % num == 0) {
        ans += num * num == A ? 1 : 2;
      }
    }

    return ans;
  }

  @Override
  public int compare(Integer o1, Integer o2) {

    int factors1 = countFactors(o1);
    int factors2 = countFactors(o2);

    return factors1 == factors2 ? o1 - o2: factors1 - factors2;
  }
}

public class Assignment3 {

  ArrayList<Integer> solve(ArrayList<Integer> A) {

    MyComparator myComparator = new MyComparator();
    A.sort(myComparator);

    return A;
  }
}
